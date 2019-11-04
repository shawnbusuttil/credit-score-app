/* THIS IS A MOCK SERVER. IT IS NOT A REFLECTION OF A PRODUCTION SERVER */
const fs = require('fs');
const path = require('path');
const cors = require("cors");
const express = require('express');
const bodyParser = require('body-parser');

const applyRule = require("./rules/applyRule");

const server = express();

server.use(cors());
server.use(bodyParser.json());

// GET - Get Credit Options
server.get("/credit-cards", (req, res) => {
    try {
        const id = req.query.id;

        fs.readFile("server/db/db.json", "utf8", (_err, data) => {
            const customers = JSON.parse(data.toString()).members;
            const rules = JSON.parse(data.toString()).rules;

            const customer = customers.find(c => c.id == id);

            if (!customer) {
                return res.sendStatus(404);
            }

            const cards = rules.reduce((cards, rule) => {
                return applyRule(cards, customer, rule);
            }, []);

            return res.status(200).send({cards});
        });
    }
    catch (e) {
        return res.sendStatus(400);
    }
}); 

// POST - Register User
server.post("/register", (req, res) => {
    try {
        fs.readFile("server/db/db.json", "utf8", (_err, data) => {
            let db = JSON.parse(data);

            const { name, dateOfBirth, employment, annualIncome, address } = req.body;

            if (!(name && dateOfBirth && employment && annualIncome && address)) {
                return res.sendStatus(400);
            }
            
            const id = new Date().getTime();

            const newMember = {
                id,
                name,
                dateOfBirth,
                employment,
                annualIncome,
                address
            };

            db.members.push(newMember);

            const json = JSON.stringify(db);

            /* Store old copy of the file case of corruption. */
            if (!fs.existsSync("backups")){
                fs.mkdirSync("backups");
            }
            fs.copyFileSync('server/db/db.json', `backups/db_${new Date().getTime()}.json`, (err) => {
                if (err) throw err;
                console.log('Old file copied for rollback.');
            });

            fs.writeFile("server/db/db.json", json, "utf8", () => {
                return res.status(200).send(newMember);
            });
        });
    } catch (e) {
        return res.sendStatus(400);
    }
});

server.use(express.static(path.join(__dirname, "../build")));

server.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
});

server.listen(8080, () => console.log("Listening on port 8080..."));
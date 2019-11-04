const cardMap = require("../db/cards.json");

function applyRule(cards, customer, rule) {
    const map = cardMap;

    switch (rule.type) {
        case "DEFAULT": {
            const id = rule.payload.cardId;
            return cards.concat(map[id]);
        }
        case "EMPLOYMENTIS": {
            const id = rule.payload.cardId;
            if (customer.employment === rule.payload.condition) {
                return cards.concat(map[id]);
            }
            return cards;
        }
        case "SALARYGREATERTHAN": {
            const id = rule.payload.cardId;
            if (customer.annualIncome >= rule.payload.condition) {
                return cards.concat(map[id]);
            }
            return cards;
        }
        case "SALARYLESSTHAN": {
            const id = rule.payload.cardId;
            if (customer.annualIncome < rule.payload.condition) {
                return cards.concat(map[id]);
            }
            return cards;
        }
    }

    return cards;
}

module.exports = applyRule;
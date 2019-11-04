This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Decision Making

There are two main smart containers in this app. One handles the registration form and the other fetches the credit cards the user is eligible for. 

On the server, once a user fills a form, he is entered into a json file (mock db) called db.json. Once the user is fetched from the backend, a filtering runs on the server to render the cards he is eligible for. Note, that this does not happen on the write operation, because if more cards are added that apply to the user, they will not be fetched.

You will find a backup folder which stores the previous version of the db.json, in case it goes corrupt or you need to rollback to a previous state.

Further cards can be added in cards.json and more card eligibility rules can be added in applyRule.js if you wish to extend.

There is another smart container CustomerForm.tsx that handles the parts of the registration that exclusively have to do with the form. It shouldn't be concerned with sending the data to the server (Single Responsibility).

Form inputs are represented by the InputField component. Cards are represented by the Card component. Same goes with button and error messages.

For testing, the react testing library was used to enforce black-box testing and holds an advantage over enzyme when testing hooks, which can have issues.

I didn't have much information about form validation so I did some trivial guesswork.

## Possible Improvements

The form can be made more generic (dumb) and decoupled from just one domain (Customer).
In production, something like Formik would likely be used to handle form-specific logic. 
CSS Modules for better CSS encapsulation per component.
A Spinner component to replace the <p>Loading</p> markup for better UX.

## Available Scripts

In the project directory, you can run:

### `yarn start:server`

Runs the app in the production mode.<br />
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

### `yarn start:client` (To be run in conjunction with `yarn server` below.)

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn server`

Runs the mock server. This is by no means a production server.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

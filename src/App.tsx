import React, { FC } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import CustomerRegistration from "./containers/customer-registration/CustomerRegistration";
import CustomerCredit from "./containers/customer-credit/CustomerCredit";

const App: FC = () => (
    <Switch>
        <Redirect exact from="/" to="/customer-registration" />
        <Route path="/customer-registration" exact component={CustomerRegistration} />
        <Route path="/customer-credit" component={CustomerCredit} />
    </Switch>
);

export default App;


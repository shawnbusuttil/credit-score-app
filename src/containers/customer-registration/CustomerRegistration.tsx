import React, { FC, Fragment, useState } from "react";
import { useHistory } from "react-router-dom";

import CustomerForm from "./form/CustomerForm";

import { Customer } from "../../models/Customer";

import "./CustomerRegistration.scss";
import ErrorMessage from "../../components/error/error-message";

const CustomerRegistration: FC = () => {
    let [isError, setError] = useState(false);
    let [isLoading, setLoading] = useState(false);

    let history = useHistory();

    const registerCustomer = async(customer: Partial<Customer>) => {
        setError(false);
        setLoading(true);

        let response: Response;
        let customerData: Customer;

        try {
            response = await fetch("register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(customer)
            });

            customerData = await response.json() as Customer;

            if (customerData.id) {
                redirectToCards(customerData.id);
            } else {
                setError(true);
            }
        }
        catch (e) {
            setError(true);
        }
        finally {
            setLoading(false);
        }
    }

    const redirectToCards = (id: number) => {
        history.push("/customer-credit?id=" + id);
    }
    
    return <Fragment>
        <div className="customer-registration">
            <h1>Get A Quote</h1>
            <CustomerForm data-testid="customer-form" submit={registerCustomer} />
            {isError && !isLoading ? <ErrorMessage errors={["Couldn't fetch credit. Something went wrong."]} /> : null}
        </div>
        {isLoading ? <p>Is Loading...</p> : null}
    </Fragment>;

}

export default CustomerRegistration;
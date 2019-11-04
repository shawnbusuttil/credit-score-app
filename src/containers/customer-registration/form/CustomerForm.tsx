import React, { ChangeEvent, FormEvent } from "react";

import { isValidAgainst, validationRules } from "../validationRules";

import InputField from "../../../components/input/Input";
import Button from "../../../components/button/Button";

import { Customer, Employment } from "../../../models/Customer";

import "./CustomerForm.scss";

interface CustomerFormProps {
    submit: (customer: Partial<Customer>) => void;
}

class CustomerForm extends React.Component<CustomerFormProps> {
    state = {
        customer: {
            name: {
                value: "",
                isValid: false,
                errors: []
            },
            dateOfBirth: {
                value: "",
                isValid: false,
                errors: []
            },
            employment: {
                value: "",
                isValid: false,
                errors: []
            },
            annualIncome: {
                value: "",
                isValid: false,
                errors: []
            },
            houseNumber: {
                value: "",
                isValid: false,
                errors: []
            },
            postCode: {
                value: "",
                isValid: false,
                errors: []
            },
        }
    };

    submitForm = (e: FormEvent) => {
        e.preventDefault();

        const customer = {
            name: this.state.customer.name.value,
            dateOfBirth: this.state.customer.dateOfBirth.value,
            employment: this.state.customer.employment.value as Employment,
            annualIncome: +this.state.customer.annualIncome.value,
            address: {
                houseNumber: +this.state.customer.houseNumber.value,
                postCode: this.state.customer.postCode.value
            }
        };

        this.props.submit(customer);
    }

    handleChange = (e: ChangeEvent) => {
        const name = (e.target as HTMLInputElement).name;
        const value = (e.target as HTMLInputElement).value;

        const field = { ...this.state.customer[`${name}`], value };
        const customer = { ...this.state.customer, [`${name}`]: field };

        this.setState({ customer }, () => {
            const errors = this.applyValidation(name, value);

            const field = { 
                ...this.state.customer[`${name}`], 
                errors, 
                isValid: !errors.length
            };

            this.setState({ 
                customer: { 
                    ...this.state.customer,
                    [`${name}`]: field 
                } 
            });
        });
    }

    applyValidation = (name: string, value: string): string[] => {
        if (!validationRules[name]) {
            return [];
        }

        return Object.keys(validationRules[name]).reduce((errors: string[], rule: string) => {
            const errMsg = isValidAgainst(rule, name, value);
            return !errMsg ? errors : errors.concat(errMsg);
        }, []);
    }

    isFormValid = (): boolean => {
        for (let prop of Object.keys(this.state.customer)) {
            if (!this.state.customer[prop].isValid) {
                return false;
            }
        }
            
        return true;
    }

    render() {
        return <form data-testid="customer-form" className="customer-form" onSubmit={this.submitForm}>
            <InputField title="Name" name="name" type="text" value={this.state.customer.name.value} placeholder="e.g. John Doe" 
                handleChange={this.handleChange} errors={this.state.customer.name.errors} />

            <InputField title="Date of Birth" name="dateOfBirth" type="date" value={this.state.customer.dateOfBirth.value}
                handleChange={this.handleChange} errors={this.state.customer.dateOfBirth.errors} />

            <InputField title="Employment" name="employment" type="select" value={this.state.customer.employment.value} placeholder="Select..."
                options={["Student", "Part-Time", "Full-Time"]} handleChange={this.handleChange}
                errors={this.state.customer.employment.errors} />

            <InputField title="Annual Income" name="annualIncome" type="text" value={this.state.customer.annualIncome.value} placeholder="e.g. 50000" 
                handleChange={this.handleChange} errors={this.state.customer.annualIncome.errors} />

            <InputField title="House Number" name="houseNumber" type="text" value={this.state.customer.houseNumber.value} placeholder="e.g. 50" 
                handleChange={this.handleChange} errors={this.state.customer.houseNumber.errors} />

            <InputField title="Post Code" name="postCode" type="text" value={this.state.customer.postCode.value} placeholder="e.g. EC1V 9LN" 
                handleChange={this.handleChange} errors={this.state.customer.postCode.errors} />

            <Button title="Submit" disabled={!this.isFormValid()} />
        </form>;
    }
}

export default CustomerForm;
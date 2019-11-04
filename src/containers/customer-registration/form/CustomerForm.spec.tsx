import React from "react";
import { RenderResult, render, fireEvent } from "@testing-library/react";

import CustomerForm from "./CustomerForm";

describe("CustomerForm", () => {
    const onSubmitMock = jest.fn();
    let wrapper: RenderResult;

    it("renders the form and its inputs", () => {
        wrapper = render(<CustomerForm submit={onSubmitMock} />);
        expect(wrapper.getByTestId("customer-form")).toBeTruthy();    
        expect(wrapper.getAllByTestId("input-field").length).toEqual(6);       
    });

    describe("when a value is changed in one of the inputs", () => {
        it("reflects in the input value", () => {
            wrapper = render(<CustomerForm submit={onSubmitMock} />);

            const mockEvent = {
                target: { value: "John Doe" }
            };

            const input = wrapper.baseElement.querySelector("input[name='name']") as HTMLInputElement;
            fireEvent.change(input, mockEvent);

            expect(input.value).toEqual("John Doe");
        });
    });

    describe("when a value is changed in one of the selects", () => {
        it("reflects in the input value", () => {
            wrapper = render(<CustomerForm submit={onSubmitMock} />);

            const mockEvent = {
                target: { value: "Student" }
            };

            const input = wrapper.baseElement.querySelector("select[name='employment']") as HTMLSelectElement;
            fireEvent.change(input, mockEvent);

            expect(input.value).toEqual("Student");
        });
    });

    describe("when a value is changed and doesn't pass validation", () => {
        it("shows an error message", () => {
            wrapper = render(<CustomerForm submit={onSubmitMock} />);

            const mockEvent = {
                target: { value: "S" }
            };

            const input = wrapper.baseElement.querySelector("input[name='name']") as HTMLInputElement;
            fireEvent.change(input, mockEvent);

            expect(wrapper.getByTestId("error-message")).toBeTruthy();
        });
    });

    describe("when the form is submitted", () => {
        it("should attempt to register a customer", () => {
            wrapper = render(<CustomerForm submit={onSubmitMock} />);

            const controls = [
                { selector: "input[name='name']", val: "John Doe" },
                { selector: "input[name='dateOfBirth']", val: "2000-01-01" },
                { selector: "select[name='employment']", val: "Student" },
                { selector: "input[name='annualIncome']", val: "50000" },
                { selector: "input[name='houseNumber']", val: "56" },
                { selector: "input[name='postCode']", val: "EC1 2VH" }
            ];

            controls.forEach(c => {
                const input = wrapper.baseElement.querySelector(c.selector) as HTMLInputElement;
                fireEvent.change(input, { target: { value: c.val } });
            });

            const form = wrapper.getByTestId("customer-form");
            fireEvent.submit(form);

            expect(onSubmitMock).toHaveBeenCalledWith({ 
                name: "John Doe",
                dateOfBirth: "2000-01-01",
                employment: "Student",
                annualIncome: 50000,
                address: {
                    houseNumber: 56,
                    postCode: "EC1 2VH"
                }
            });
        });
    });
});
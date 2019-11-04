import React from "react";
import { RenderResult, render, fireEvent, waitForElement, wait } from "@testing-library/react";

import CustomerRegistration from "./CustomerRegistration";

const mockHistory = { push: jest.fn() };

jest.mock("react-router-dom", () => ({
    useHistory: () => mockHistory
}));

describe("CustomerRegistration", () => {
    let wrapper: RenderResult;
    
    it("renders the form without errors", () => {
        wrapper = render(<CustomerRegistration />);
        expect(wrapper.getByTestId("customer-form")).toBeTruthy();
    });

    describe("when there is an error during fetch", () => {
        let postSpy: jest.SpyInstance;

        beforeEach(() => {
            window.fetch = jest.fn().mockImplementationOnce(() => ({
                json: () => Promise.resolve({})
            }));
    
            postSpy = jest.spyOn(window, "fetch");
        });
        
        it("should display the form with error", async() => {
            wrapper = render(<CustomerRegistration />);

            const form = wrapper.getByTestId("customer-form");
            fireEvent.submit(form);
            
            const error = await waitForElement(() => wrapper.getByTestId("error-message"));

            expect(postSpy).toHaveBeenCalledTimes(1);
            expect(error).toBeTruthy();
        });
    });

    describe("when the request is successful during fetch", () => {
        let postSpy: jest.SpyInstance;
        let redirectSpy: jest.SpyInstance;

        beforeEach(() => {
            window.fetch = jest.fn().mockImplementationOnce(() => ({
                json: () => Promise.resolve({ id: 1 })
            }));

            postSpy = jest.spyOn(window, "fetch");
            redirectSpy = jest.spyOn(mockHistory, "push");
        });
        
        it("should redirect to the credit page", async() => {
            wrapper = render(<CustomerRegistration />);

            let form = await waitForElement(() => wrapper.getByTestId("customer-form"));
            fireEvent.submit(form);

            await wait(() => wrapper.getByTestId("customer-form"));
            expect(postSpy).toHaveBeenCalledTimes(1);
            expect(redirectSpy).toHaveBeenCalledTimes(1);
        });
    });
});
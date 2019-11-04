import React from "react";
import { RenderResult, render, waitForElement } from "@testing-library/react";

import CustomerCredit from "./CustomerCredit";

const mockHistory = { location: { search: "?id=1" } };

jest.mock("react-router-dom", () => ({
    useHistory: () => mockHistory
}));

describe("CustomerCredit", () => {
    let wrapper: RenderResult;
    
    it("renders the loading component", () => {
        wrapper = render(<CustomerCredit />);
        const loading = wrapper.getByTestId("loading");
        expect(loading).toBeTruthy();
    });

    describe("when cards are fetched", () => {
        beforeEach(() => {
            window.fetch = jest.fn().mockImplementationOnce(() => ({
                json: () => Promise.resolve({ 
                    cards: [
                        {
                            name: "TestCard1",
                            balanceTransferOfferDuration: 0,
                            purchaseOfferDuration: 0,
                            creditAvailable: 1200
                        },
                        {
                            name: "TestCard2",
                            balanceTransferOfferDuration: 0,
                            purchaseOfferDuration: 6,
                            creditAvailable: 1500
                        }
                    ]
                })
            }));
        });
        
        it("renders the cards", async() => {
            wrapper = render(<CustomerCredit />);
            const cards = await waitForElement(() => wrapper.getAllByTestId("card"));
            expect(cards.length).toBe(2);
        });
    });

    describe("when an error is thrown", () => {
        beforeEach(() => {
            window.fetch = jest.fn().mockImplementationOnce(() => ({
                statusText: "Error"
            }));
        });

        it("renders the cards", async() => {
            wrapper = render(<CustomerCredit />);
            const error = await waitForElement(() => wrapper.getByTestId("error"));
            expect(error).toBeTruthy();
        });
    });
});
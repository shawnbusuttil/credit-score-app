import React from "react";
import { render, RenderResult } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import Card from "./Card";

describe("Card", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(<Card name="Test Card"
            apr="16.9%"
            balanceTransferOfferDuration={0}
            purchaseOfferDuration={6}
            creditAvailable={1200}
            isSelected={true}
        />);
    });

    it("renders the component with the correct props", () => {
        expect(wrapper.getByTestId("card-name").textContent).toEqual("Test Card");
        expect(wrapper.getByTestId("card-apr").textContent).toEqual("Apr: 16.9%");
        expect(wrapper.getByTestId("card-btod").textContent).toEqual("Balance Transfer Offer Duration: 0 Months");
        expect(wrapper.getByTestId("card-pod").textContent).toEqual("Purchase Offer Duration: 6 Months");
        expect(wrapper.getByTestId("card-credit").textContent).toEqual("Credit Available: £1200");
    });

    it("has a selected class when selected", () => {
        const card = wrapper.getByTestId("card");
        expect(card.className).toContain("selected");
    });
});
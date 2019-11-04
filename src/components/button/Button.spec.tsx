import React from "react";
import { render, RenderResult } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Button from "./Button";

describe("Button", () => {
    let wrapper: RenderResult;
 
    it("renders the component with the correct props", () => {
        wrapper = render(<Button title="Test Button" disabled={true} />);
        expect(wrapper.getByTestId("button").textContent).toEqual("Test Button");
        expect(wrapper.getByTestId("button")).toBeDisabled();
    });
});
import React from "react";
import { RenderResult, render } from "@testing-library/react";

import ErrorMessage from "./error-message";

describe("Error Message", () => {
    let wrapper: RenderResult;

    it("should render an error message", () => {
        wrapper = render(<ErrorMessage errors={["This is a test."]} />);
        expect(wrapper.getByTestId("error-message").textContent).toEqual("This is a test.");
    });
});


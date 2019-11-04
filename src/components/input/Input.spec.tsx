import React from "react";
import { render, fireEvent, RenderResult } from '@testing-library/react';

import InputField from "./Input";

describe("InputField - Input", () => {
    const onChangeMock = jest.fn();
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(<InputField title="Test Input Title" 
            name="Test Input Name"
            type="text"
            value="Test Input Value"
            placeholder="Test Input Placeholder"
            handleChange={onChangeMock}
        />);
    });

    it("renders the component with the correct props", () => {
        expect(wrapper.getByTestId("input-label").textContent).toEqual("Test Input Title");
        const input = wrapper.getByPlaceholderText("Test Input Placeholder") as HTMLInputElement;
        expect(input.value).toEqual("Test Input Value");
    });

    it("calls the handler when clicked", () => {
        const mockEvent = {
            target: { value: "Hello" }
        };

        const input = wrapper.getByPlaceholderText("Test Input Placeholder") as HTMLInputElement;
        fireEvent.change(input, mockEvent);
        expect(onChangeMock).toHaveBeenCalled();
    });
});

describe("InputField - Select", () => {
    const onChangeMock = jest.fn();
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(<InputField title="Test Input Title" 
            type="select"
            name="Test Input Name"
            value="Test Input Value"
            placeholder="Test Input Placeholder" 
            options={["a", "b", "c"]}
            handleChange={onChangeMock} 
        />);
    });

    it("renders the component with the correct props", () => {
        expect(wrapper.getByTestId("input-label").textContent).toEqual("Test Input Title");

        const input = wrapper.getByTestId("input-field") as HTMLSelectElement;
        expect(input.value).toEqual("a");

        const options = wrapper.getAllByTestId("input-option") as HTMLOptionElement[];
        options.map(o => expect(o.value).toEqual(o.textContent));
    });

    it("calls the handler when clicked", () => {
        const mockEvent = {
            target: { value: "b" }
        };

        const input = wrapper.getByTestId("input-field") as HTMLSelectElement;
        fireEvent.change(input, mockEvent);
        expect(onChangeMock).toHaveBeenCalled();
    });
});
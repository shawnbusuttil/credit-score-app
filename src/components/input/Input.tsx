import React, { ChangeEvent } from "react";

import "./Input.scss";
import ErrorMessage from "../error/error-message";

interface InputFieldProps {
    name: string;
    type: string;
    title: string;
    value: string | number | string[];
    options?: string[];
    placeholder?: string;
    handleChange?: (e: ChangeEvent) => void;
    errors?: string[];
}

const InputField = (props: InputFieldProps) => {
    let input = props.type === "select" ? 
    <select data-testid="input-field" className="input-field"
        name={props.name}
        value={props.value}
        onChange={props.handleChange}>
        <option value="" disabled>{props.placeholder}</option>
        {props.options && props.options.map(option => {
            return <option data-testid="input-option" key={option} value={option} label={option}>
                {option}
            </option>;
        })}
    </select>
    : <input data-testid="input-field" className="input-field"
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder} 
    />

    return <div className="input-group">
        <label data-testid="input-label" htmlFor={props.name} className="input-label">{props.title}</label>
        {input}
        {props.errors && <ErrorMessage errors={props.errors} />}
    </div>
};

export default InputField;
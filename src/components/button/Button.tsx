import React from "react";

import "./Button.scss";

export interface ButtonProps {
    title: string;
    disabled: boolean;
}

const Button = (props: ButtonProps) => (
    <button data-testid="button" type="submit" disabled={props.disabled}>{props.title}</button>
);

export default Button;
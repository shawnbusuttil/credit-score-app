import React from "react";

interface ErrorProps {
    errors: string[];
}

const ErrorMessage = (props: ErrorProps) => {
    return props.errors.length ? 
        <p data-testid="error-message" className="error-message">
            {props.errors[0][0].toUpperCase() + props.errors[0].slice(1)}
        </p> : null
};

export default ErrorMessage;
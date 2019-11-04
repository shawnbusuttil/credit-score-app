import React from "react";

import "./Card.scss";

interface CardProps {
    name: string;
    apr: string;
    balanceTransferOfferDuration: number;
    purchaseOfferDuration: number;
    creditAvailable: number;
    isSelected: boolean;
    clicked?: () => void;
}

const Card = (props: CardProps) => {
    return (<div data-testid="card" className={`card ${props.isSelected ? "selected" : "" }`} onClick={props.clicked}>
        <h2 data-testid="card-name">{props.name}</h2>
        <p data-testid="card-apr">Apr: {props.apr}</p>
        <p data-testid="card-btod">Balance Transfer Offer Duration: {props.balanceTransferOfferDuration} Months</p>
        <p data-testid="card-pod">Purchase Offer Duration: {props.purchaseOfferDuration} Months</p>
        <p data-testid="card-credit">Credit Available: £{props.creditAvailable}</p>
    </div>);
};

export default Card;
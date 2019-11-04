import React, { useState, Fragment, FC } from "react";
import { useHistory } from "react-router-dom";

import useFetchCards from "./useFetchCards";

import Card from "../../components/card/Card";
import { Card as ICard } from "../../models/Card";

import "./CustomerCredit.scss";

const CustomerCredit: FC = () => {
    const history = useHistory();
    const state = useFetchCards(history);

    let [cards, setCards] = useState([] as ICard[]);

    const manageSelectedCards = (c: ICard) => {
        const index = cards.findIndex(card => card.name === c.name);

        if (index !== -1) {
            setCards([...cards.slice(0, index), ...cards.slice(index + 1, cards.length)]);
        } else {
            setCards([...cards, c]);
        }
    }

    let cardsView = state.isBusy ? <p data-testid="loading">Loading...</p> 
        : <p data-testid="error" className="error">{state.res!.error}</p>;

    if (state.res && state.res.cards) {
        if (state.res.cards.length) {
            cardsView = <Fragment>
                <h1>You are eligible for:</h1>
                {state.res.cards.map(c => <Card key={c.name} data-testid="card"
                    name={c.name}
                    apr={c.apr}
                    balanceTransferOfferDuration={c.balanceTransferOfferDuration}
                    purchaseOfferDuration={c.purchaseOfferDuration}
                    creditAvailable={c.creditAvailable}
                    isSelected={cards.includes(c)}
                    clicked={() => manageSelectedCards(c)}
                />)}
                <p className="customer-credit-total">
                    Your total credit is £{cards.reduce((acc: number, c: ICard) => acc + c.creditAvailable, 0)}.
                </p>
            </Fragment>
        } else {
            cardsView = <p>There are no cards available.</p>;
        }
    }

    return <div className="customer-credit">{cardsView}</div>;
}

export default CustomerCredit;
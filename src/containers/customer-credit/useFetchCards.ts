import { useState, useEffect } from "react";

import { Card } from "../../models/Card";
import { History } from "history";

export interface CardResponse {
    cards?: Card[];
    error?: string;
}

const useFetchCards = (history: History) => {
    const [result, setResult] = useState<{ isBusy: boolean, res?: CardResponse }>({
		isBusy: true
    });
    
    useEffect(() => {
        let response: Response;

        async function fetchCards() {
            try {
                response = await fetch(`/credit-cards/${history.location.search}`);
                const data = await response.json();
                
                setResult({
                    res: { 
                        cards: data.cards, 
                        error: data.error 
                    },
                    isBusy: false 
                });
            }
            catch (e) {
                setResult({
                    res: {
                        error: response.statusText
                    },
                    isBusy: false 
                });
            }
        }

        fetchCards();
    }, [history]);

    return result;
}

export default useFetchCards;
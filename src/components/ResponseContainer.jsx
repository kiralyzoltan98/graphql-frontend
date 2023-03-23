import React from "react";
import Card from "./Card";
import { useState } from "react";

const ResponseContainer = (props) => {

    var myHeaders = new Headers();
    let cardData = {};
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "query": "{ books { name } }"
    });


    async function fetchGraphQL() {
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        const response = await fetch("http://localhost:5000/graphql?", requestOptions);
        const result = await response.text();
        cardData = JSON.parse(result).data;
        console.log(cardData);
        return result;
    }
    
    const handleSendButtonClick = async () => { 
        await fetchGraphQL();
        setCards(cardData.books);
    }

    const [cards, setCards] = useState(props.cards);

    return (
        <>
            <button onClick={handleSendButtonClick}>Send</button>
            <div>
                {cards.map((card) => {
                    return (
                        <Card
                            href={card.name}
                            title={card.name}
                            body={card.name}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default ResponseContainer;
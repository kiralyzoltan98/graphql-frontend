import React from "react";
import Card from "./Card";
import { useState } from "react";

const ResponseContainer = (props) => {

    var myHeaders = new Headers();
    let cardData = {};
    myHeaders.append("Content-Type", "application/json");

    const makeQueryAndCall = async () => {
        // Initialize the query string with the root query
        let query = "{";
    
        // Check if the books checkbox is checked
        if (document.getElementById("booksCBX").checked) {
          query += " books { name }";
        }
    
        // Check if the authors checkbox is checked
        if (document.getElementById("authorsCBX").checked) {
          query += " authors { name }";
        }
    
        // Check if the bookById checkbox is checked and get the id value
        if (document.getElementById("bookByIdCBX").checked) {
          const bookId = document.getElementById("bookById").value;
          query += ` book(id:${bookId}) { name }`;
        }
    
        // Check if the authorById checkbox is checked and get the id value
        if (document.getElementById("authorByIdCBX").checked) {
          const authorId = document.getElementById("authorById").value;
          query += ` author(id:${authorId}) { name }`;
        }

        query += "}";
        console.log(query);
    
        return JSON.stringify({ query });
      }


    async function fetchGraphQL(query) {
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: query,
        };
        const response = await fetch("http://localhost:5000/graphql?", requestOptions);
        const result = await response.text();
        cardData = JSON.parse(result).data;
        console.log(cardData);
        return result;
    }
    
    const handleSendButtonClick = async () => { 
        const query = await makeQueryAndCall();
        await fetchGraphQL(query);
        let cardValue = [];
        const keys = ['books', 'authors', 'book', 'author'];
        for (const key of keys) {
            if (cardData[key]) {
                if (Array.isArray(cardData[key])) {
                    cardValue = cardValue.concat(cardData[key]);
                } else {
                    cardValue.push(cardData[key]);
                }
            }
        }
        setCards(cardValue);
    }

    const [cards, setCards] = useState(props.cards);

    return (
        <>
            <button class="send-button" onClick={handleSendButtonClick}>Send</button>
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
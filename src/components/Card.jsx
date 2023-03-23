import React from "react";

const Card = (props) => {

    return (
        <li class="link-card">
            <a href={props.href}>
                <h2>
                    {props.title}
                    <span>&rarr;</span>
                </h2>
                <p>
                    {props.body}
                </p>
            </a>
        </li>
    );
};

export default Card;
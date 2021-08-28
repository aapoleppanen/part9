import React from "react";
import { coursePart } from "./Content";

const Total = ({courseParts}: {courseParts: Array<coursePart>}) => {
    return (
        <p>
            Number of exercises{" "}
            {courseParts.reduce((a,b) => a+b.exerciseCount, 0)}
        </p>
    )
}

export default Total;
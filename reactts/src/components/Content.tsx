import React from "react";
import { CoursePart } from "../App";
import Part from "./Part";

const Content = ({courseParts}: {courseParts: Array<CoursePart>}) => {
    return (
        <div>
            {
                courseParts.map((e) => (
                    <p key={e.name}>
                        <Part part={e}></Part>
                    </p>
                ))
            }
        </div>
    )
}

export default Content;
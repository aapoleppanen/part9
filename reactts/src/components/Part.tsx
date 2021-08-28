import React from 'react'
import { CoursePart } from '../App';


const Part = ({part}: {part: CoursePart}) => {
    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };

      const returnProperties = (part: CoursePart) => {
        switch(part.type){
            case("normal"):
                return (
                    <>
                     <b>{part.name}</b> <br />
                    <i>{part.description} </i><br />
                     {"Number of exercises: "} {part.exerciseCount} <br />
                    </>
                )
            case("groupProject"):
                return (
                    <>
                   <b>{part.name}</b> <br />
                    {"Project count: "}{part.groupProjectCount} <br />
                    {"Number of exercises: "}{part.exerciseCount} <br />
                    </>
                 )
            case("submission"):
                return (
                    <>
                    <b>{part.name}</b> <br />
                    <i>{part.description} </i><br />
                    {"Number of exercises: "}{part.exerciseCount} <br /> 
                    {part.exerciseSubmissionLink}
                    </>
                )
            case("special"):
                    return (
                        <>
                        <b>{part.name}</b> <br />
                    <i>{part.description} </i><br />
                        {"Number of exercises: "}{part.exerciseCount} <br />
                        {"Requirements "}{part.requirements.join(" ")}
                        </> 
                    )
            default:
                return assertNever(part);
        }
      }

    return (
        <div>
            {
                returnProperties(part)
            }
        </div>
    )
    // switch(part.type){
    //     case("normal"):
    //         break;
    //     case("groupProject"):
    //         break;
    //     case("submission"):
    //         break;
    //     default:
    //         return assertNever(part);
    // }
}

export default Part;
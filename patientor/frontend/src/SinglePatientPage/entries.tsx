import React from 'react';
import { Entry } from '../types';
import { Icon, SemanticCOLORS } from 'semantic-ui-react';
import { Diagnosis, SickLeave } from '../types';

const EntryView = ({entry, diagnoses}: {entry: Entry, diagnoses: { [id: string]: Diagnosis };}) => {

    const healthRating = (rating: number): SemanticCOLORS => {
        switch(rating){
            case 0:
                return "green";
            case 1:
                return "yellow";
            case 2:
                return "orange";
            case 3:
                return "red";
            default:
                return "green";
        }
    };

    const sickLeave = (sickLeave: SickLeave | undefined) => {
        try {
            if(sickLeave === undefined){
                return;
            }
            return (
                <div>
                Sick Leave: {sickLeave.startDate} - {sickLeave.endDate}
                </div>
            );
        } catch (e) {
            console.log(e);
        }
    };

    const diagnosisEntry = (codes: string[] | undefined) => {
        try {
            if(codes === undefined){
                return;
            }
            return (
                <div>
                    {codes.map((c) => {
                                return (
                                    <li key={c}>
                                        {c} {" "}
                                        {diagnoses[c].name}
                                    </li>
                                );
                            })}
                </div>
            );
        } catch (e) {
            console.log(e);
        }
    };

    switch(entry.type){
        case "Hospital": 
            return (
                <div>
                    <b>{entry.date}</b>
                    <Icon name="hospital"></Icon>
                    <br />
                    <i>{entry.description} </i><br />
                    discharge: {entry.discharge.date} {" "}
                    <i>{entry.discharge.criteria}</i> <br /> <br />
                    {diagnosisEntry(entry.diagnosisCodes)}
                </div>
            );
            case "HealthCheck": 
            return (
                <div>
                    <b>{entry.date}</b>
                    <Icon name="doctor"></Icon>
                    <br />
                    <i>{entry.description} </i><br />
                    Rating: {" "} 
                    <Icon name="heart" color={
                        healthRating(entry.healthCheckRating)
                    }></Icon>
                    {" "}
                     <br /> <br />
                    {diagnosisEntry(entry.diagnosisCodes)}
                </div>
            );
        case "OccupationalHealthcare": 
            return (
                <div>
                    <b>{entry.date}</b>
                    <Icon name="stethoscope"></Icon>
                    <br />
                    <i>{entry.description} </i><br />
                    Employer: {" "} {entry.employerName}
                    <br />
                    {sickLeave(entry.sickLeave)}
                    {" "}
                     <br />
                     {diagnosisEntry(entry.diagnosisCodes)}
                </div>
            );
        default:
            return (
                <div>
                </div>
            );
    }
};

export default EntryView;
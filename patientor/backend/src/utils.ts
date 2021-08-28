import { NewPatient, Gender, NewEntry, HealthCheckRating } from "./types";

const parseString = (entry: unknown): string => {
    if(!entry || !isString(entry)){
        throw new Error(`Incorrect or missing value: ${entry}`);
    }

    return entry;
};

const isString = (entry: unknown): entry is string => {
    return typeof entry === "string" || entry instanceof String;
};

const parseDate = (entry: unknown): string => {
    if(!entry || !isString(entry) || !isDate(entry)){
        throw new Error(`Incorrect or missing date: ${entry}`);
    }

    return entry;
};

const isDate = (entry: string): boolean => {
    return Boolean(Date.parse(entry));
};

const parseCodes = (entry: unknown[]): string[] => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if(!entry || entry.some((v) => !isString(v))){
        throw new Error(`Missing value: ${entry}`);
    }
    return entry as string[];
};

const parseGender = (entry: unknown): Gender => {
    if(!entry || !isGender(entry)){
        throw new Error(`incorrect or missing gender: ${entry}`);
    }

    return entry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (entry: any): entry is Gender => {
    return Object.values(Gender).includes(entry);
};

const parseHealthCheckRating = (entry: unknown): HealthCheckRating => {
    if(!entry || !isHealthCheckRating(entry)){
        throw new Error(`incorrect or missing health check rating: ${entry}`);
    }

    return Number(entry);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (entry: any): entry is HealthCheckRating => {
    console.log(Object.values(HealthCheckRating));
    console.log(typeof entry);
    return Object.values(HealthCheckRating).includes(Number(entry));
};


type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatient => {
    const newPatient: NewPatient = {
        name: parseString(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseString(ssn),
        gender: parseGender(gender),
        occupation: parseString(occupation),
    };

    return newPatient;
};

type BaseFields = { description: unknown, date: unknown, specialist: unknown, diagnosisCodes?: unknown[] };
type HealthCheckFields = BaseFields & { type: "HealthCheck", healthCheckRating: unknown };
type HospitalFields = BaseFields & { type: "Hospital", discharge: { date: unknown, criteria: unknown } };
type OccupationalHealthCareFields = BaseFields & { type: "OccupationalHealthcare", employerName: unknown, sickLeave?: { startDate: unknown, endDate: unknown }};
type fields = HealthCheckFields | OccupationalHealthCareFields | HospitalFields;

export const toNewEntry = (props: fields): NewEntry => {
    parseString(props.type);
    switch(props.type){
        case "Hospital":
            const hospitalEntry: NewEntry = {
                description: parseString(props.description),
                date: parseDate(props.date),
                specialist: parseString(props.specialist),
                type: props.type,
                discharge: {
                    date: parseDate(props.discharge.date),
                    criteria: parseString(props.discharge.criteria),
                }
            };
            if(props.diagnosisCodes){
                hospitalEntry.diagnosisCodes = parseCodes(props.diagnosisCodes);
            }
            return hospitalEntry;
        case "HealthCheck":
            const healthEntry: NewEntry = {
                description: parseString(props.description),
                date: parseDate(props.date),
                specialist: parseString(props.specialist),
                type: props.type,
                healthCheckRating: parseHealthCheckRating(props.healthCheckRating), // write parsing function for this and type
            };
            if(props.diagnosisCodes){
                healthEntry.diagnosisCodes = parseCodes(props.diagnosisCodes);
            }
            return healthEntry;
        case "OccupationalHealthcare":
            const occupationalEntry: NewEntry = {
                description: parseString(props.description),
                date: parseDate(props.date),
                specialist: parseString(props.specialist),
                type: props.type,
                employerName: parseString(props.employerName),
            };
            if(props.sickLeave){
                const parsedLeave = {
                    startDate: parseDate(props.sickLeave.startDate),
                    endDate: parseDate(props.sickLeave.endDate),
                };
                occupationalEntry.sickLeave = parsedLeave;
            }
            if(props.diagnosisCodes){
                occupationalEntry.diagnosisCodes = parseCodes(props.diagnosisCodes);
            }
            return occupationalEntry;
    }
};

export default toNewPatient;

// export interface Patient {
//     id: string;
//     name: string;
//     dateOfBirth: string;
//     ssn?: string;
//     gender: Gender;
//     occupation: string;

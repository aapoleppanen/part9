/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientsRaw from "../data/patients";
import { NewPatient, NonSensitivePatient, Patient, NewEntry, Entry } from "../types";
import {v4 as uuid} from 'uuid';
import toNewPatient from "../utils";

const patients: Patient[] = patientsRaw.map(obj => {
    const object = toNewPatient(obj) as Patient;
    object.id = obj.id;
    return object;
});

const getPatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, }) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
            entries: [],
        }
    ));
};

const getSinglePatient = (id: string): Patient => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const patient: any = patientsRaw.filter(e => e.id === id)[0];
    if(!patient.entries){
        patient.entries = [];
    }
    const result: Patient = patient;
    return result;
};

const addPatient = (patient: NewPatient): Patient => {
    const id = uuid();
    const newPatient = {
        id,
        ...patient
    };
    patients.push(newPatient);
    return newPatient;
};

const addEntry = (patientId: string, entry: NewEntry): Patient => {
    const patient = patientsRaw.filter(e => e.id === patientId)[0];
    const id = uuid();
    const processedEntry: Entry = {
        id,
        ...entry
    };
    patient.entries = patient.entries?.concat(processedEntry);
    patients[patients.findIndex(e => e.id === patientId)] = patient;
    return patient;
};

export default { getPatients, addPatient, getSinglePatient, addEntry };
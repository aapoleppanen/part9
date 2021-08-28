import express from "express";
import patientService from "../services/patientService";
import toNewPatient, { toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patientService.getPatients());
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    res.send(patientService.getSinglePatient(id));
});

router.post("/", (req, res) => {
    //validation as a new diary object through utils file
    const newPatient = toNewPatient(req.body);

    //addidary function in patientService which adds id
    const addedPatient = patientService.addPatient(newPatient);
    res.send(addedPatient);
});

router.post("/:id/entries", (req, res) => {
    const id = req.params.id;
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(id, newEntry);
    res.send(addedEntry);
});

export default router;
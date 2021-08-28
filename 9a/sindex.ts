import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";
import { Request } from 'express';

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});

app.get("/bmi", (req, res) => {
    try {
        const weight = Number(req.query.weight);
        const height = Number(req.query.height);
        if(isNaN(weight) || isNaN(height)){
            throw new Error("Malformatted parameters.");
        }
        const bmiString = calculateBmi(height, weight);
        res.send({
            weight,
            height,
            bmiString
        });
    } catch (e) {
        console.log(e);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.send(JSON.stringify(e.message));
    }
});

interface bodyInterface {
    target: number;
    daily_exercises: Array<number>;
}

app.post("/exercises", (req: Request<unknown,unknown,bodyInterface>, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    try {
        const { target, daily_exercises } = req.body;
        if(isNaN(target) || !daily_exercises.every(function(element: number) {return typeof element === 'number';})){
            throw new Error("Malformatted parameters");
        }
        if(target === null || daily_exercises === null) {
            throw new Error("Missing parameters");
        }
        const output = calculateExercises([target, ...daily_exercises]);
        res.send(output);
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.send(JSON.stringify("Malformatted parameters"));
    }

});
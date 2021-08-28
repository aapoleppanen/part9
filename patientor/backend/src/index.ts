import express from "express";
const app = express();
app.use(express.json());
import cors from "cors";
import diagnosisRouter from "./routers/diagnosisRouter";
import patientRouter from "./routers/patientRouter";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/require-await
const jsonErrorHandler = async (err: any, _req: any, res:any , _next:any ) => {
    console.log(err.message);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
    res.status(500).send({ error: err.message });
  };

app.use(cors());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
    res.send("pong");
});

app.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
});

app.use("/api/diagnoses", diagnosisRouter);
app.use("/api/patients", patientRouter);
app.use(jsonErrorHandler);
import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";

import { TextField, DiagnosisSelection, 
    TypeSelectField, TypeOption
, SpecificTypeFields } from "../AddPatientModal/FormField";
import { NewEntry, EntryTypes, HealthCheckRating } from "../types";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
type DistributiveOmit<T, K extends keyof any> = T extends any
? Omit<T, K>
: never;

export type EntryFormValues = DistributiveOmit<NewEntry, "type">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

// const ratingOptions: RatingOption[] = [
//     { value: HealthCheckRating.Healthy, label: "Healthy"},
//     { value: HealthCheckRating.LowRisk, label: "LowRisk"},
//     { value: HealthCheckRating.HighRisk, label: "HighRisk"},
//     { value: HealthCheckRating.CriticalRisk, label: "CriticalRisk"}
// ];

const typeOptions: TypeOption[] = [
    { value: EntryTypes.HealthCheck, label: "HealthCheck"},
    { value: EntryTypes.Hospital, label: "Hospital"},
    { value: EntryTypes.OccupationalHealthcare, label: "OccupationalHealthcare"}
];

//diagnosis selector trough formfield.tsx
//discharge date and that through textfields

export const AddEntryForm = ({ onSubmit, onCancel } : Props ) => {
    const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [""],
        healthCheckRating: HealthCheckRating.Healthy,
        discharge: {
            date: "",
            criteria: ""
        },
        employerName: "",
        sickLeave: {
            startDate: "",
            endDate:""
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values}) => {
        return (
          <Form className="form ui">
                <TypeSelectField
                name="type"
                label="HealthCheck Rating"
                options={typeOptions}
            ></TypeSelectField>
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <SpecificTypeFields values={values}></SpecificTypeFields>
            {/* discharge:
            <Field
              label="Date"
              placeholder="Date"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Criteria"
              placeholder="Criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <RatingSelectField
                name="rating"
                label="HealthCheck Rating"
                options={ratingOptions}
            ></RatingSelectField> */}
            <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />   
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;

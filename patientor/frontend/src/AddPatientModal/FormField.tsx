import React from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";
import { Diagnosis, Gender, HealthCheckRating, EntryTypes } from "../types";


const ratingOptions: RatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy"},
  { value: HealthCheckRating.LowRisk, label: "LowRisk"},
  { value: HealthCheckRating.HighRisk, label: "HighRisk"},
  { value: HealthCheckRating.CriticalRisk, label: "CriticalRisk"}
];
// structure of a single option
export type GenderOption = {
  value: Gender;
  label: string;
}; 

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: GenderOption[];
};

//structure of healthcheckoption
export type RatingOption = {
  value: HealthCheckRating;
  label: string;
};

type RatingSelectFieldProps = {
  name: string;
  label: string;
  options: RatingOption[];
};

export type TypeOption = {
  value: EntryTypes;
  label: string;
};

type TypeSelectProps = {
  name: string;
  label: string;
  options: TypeOption[];
};

export const SelectField = ({
  name,
  label,
  options
}: SelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

export const RatingSelectField = ({ name, label, options }: RatingSelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map(option => (
        <option value={option.value} key={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

export const TypeSelectField = ({ name, label, options }: TypeSelectProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map(option => (
        <option value={option.value} key={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);


interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField= ({
  field,
  label,
  placeholder
}: TextProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export const NumberField = ({ field, label, min, max } : NumberProps ) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type='number' min={min} max={max} />

    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const field = "diagnosisCodes";
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = diagnoses.map(diagnosis => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code
  }));

  return (
    <Form.Field>
      <label>Diagnoses</label>
      <Dropdown
        fluid
        multiple
        search
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SpecificTypeFields = (values: any) => {
  switch(values.values.type){
    case "Hospital":
      return (
        <div>
           discharge:
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
        </div>
      );
      case "HealthCheck":
        return (
          <RatingSelectField
          name="healthCheckRating"
          label="HealthCheck Rating"
          options={ratingOptions}
      ></RatingSelectField>
        );
      case "OccupationalHealthcare":
        return (
          <div>
          <Field
          label="Employer Name"
          placeholder="Employer Name"
          name="employerName"
          component={TextField}
        />
        <p>SickLeave</p>
        <Field
              label="Start date"
              placeholder="start date"
              name="sickLeave.startDate"
              component={TextField}
            />
              <Field
              label="End Date"
              placeholder="End Date"
              name="sickLeave.endDate"
              component={TextField}
            />
          </div>
        );
      default: 
      return (
        <div></div>
      );
  }
};

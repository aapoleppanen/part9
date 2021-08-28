import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { Patient } from "../types"; //NewEntry
import { useStateValue, singlePatientAction } from "../state";
import { Button } from "semantic-ui-react";
import EntryView from './entries';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
// import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

//fetch from /api/patients/:id
//add to application state
//if data exists in application state do not refetch data
//define new action type for updating an individual patients data
const SinglePatient = () => {
    const [{ patients, diagnoses }, dispatch] = useStateValue();
    const [patient, setPatient] = useState<Patient>();
    const { id }  = useParams<{ id: string }>();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            console.log(values);
          const { data: updatedPatient } = await axios.post<Patient>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
          );
          console.log(updatedPatient);
          setPatient(updatedPatient);
          dispatch(singlePatientAction(updatedPatient));
          closeModal();
        } catch (e) {
          console.error(e.response?.data.error || 'Unknown Error');
          setError(e.response?.data?.error || 'Unknown error');
        }
      };


  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

    useEffect(() => {

        const fetchSinglePatient = async () => {
            try {
                const { data: singlePatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                dispatch(singlePatientAction(singlePatient));
                setPatient(singlePatient);
            } catch (error) {
                console.error(error);
            }
        };

        try {
            if(patients[id].ssn === undefined){
                void fetchSinglePatient();
            } else {
                setPatient(patients[id]);
            }
        }catch (e) {
            console.log(e);
        }
    }, [patients]);

    return (
        <div>
            <div><AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            ></AddEntryModal>
                  <Button onClick={() => openModal()}>Add Entry</Button></div>
           <b> {patient?.name} <br /> </b>
            {patient?.occupation} <br />
            {patient?.ssn} {" "}
            {patient?.gender} <br />
            {patient?.dateOfBirth}
            <br /> <br />
            Entries: <br />
            {
                patient?.entries?.map((entry) => {
                    return (
                            <EntryView key={entry.id} entry={entry} diagnoses={diagnoses}></EntryView>
                    );
                })
            }
        </div>
    );
};

export default SinglePatient;
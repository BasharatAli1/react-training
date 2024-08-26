import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PatientDetail from './patientDetail';
import { getAccessToken } from '../../../utils/helper';

const Detail = () => {
    const params = useParams();
    const [patient, setPatient] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const getPatients = () => {
        const url = `http://127.0.0.0:3001/api/patients/${params.id}`;
        const accessToken = getAccessToken();
        try {
            fetch(url, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken
                },
            }).then(response => response.json())
                .then(result => {
                    if(result.status === "success") {
                        setLoading(false);
                        setPatient(result.data);
                        return ;
                    }
                })
                .catch(error => console.log('error', error));
            return [];
        } catch (error) {
            console.log('333', error.message);
            // handle network error
        }
    }
    useEffect(() => {
        getPatients();
    }, [])
  return (
    <>
        {
            loading ? <h2>Loading</h2> : <PatientDetail patient={patient} />
        }
    </>
  )
}

export default Detail
import React, { useEffect, useState } from 'react'
import Patients from './patients';
import { useDispatch } from 'react-redux';
import { setPatientList } from '../../../slices/patient';
import AddPatientForm from '../add patient/addPatientForm';
import { getAccessToken } from '../../../utils/helper';

const PatientListing = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const getPatients = () => {
        const url = 'http://127.0.0.0:3001/api/patients/list';
        const accessToken = getAccessToken();
        const requestBody = {
            filters: {
                query: ""
            },
            pagination: {
                page: 1,
                perPage: 10
            }
        };
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            },
            body: JSON.stringify(requestBody),
            redirect: 'follow'
        })
        .then(response => response.json())
        .then(result => {
            if (result.status === "success") {
                setLoading(false);
                dispatch(setPatientList(result?.data?.rows || []));
                return;
            }
        })
        .catch(error => {
            setLoading(false);
            console.log('Get Patients Err:::', error.message);
        });
        return [];
    }
    useEffect(() => {
        getPatients();
    }, [])
    return (
        <>
            <div>Index - Patient Listing</div>
            <AddPatientForm getPatients={getPatients} setLoading={setLoading}/>
            {
                loading ? <h2>Loading</h2> : <Patients />
            }
        </>
    )
}

export default PatientListing
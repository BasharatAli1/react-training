import React, { useEffect, useState } from 'react'
import Patients from './patients';
import { useDispatch } from 'react-redux';
import { setPatientList } from '../../../slices/patient';
import AddPatientForm from '../add patient/addPatientForm';
import { getAccessToken } from '../../../utils/helper';
import { API } from '../../../axios';

const PatientListing = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const getPatients = async () => {
        const requestBody = {
            filters: {
                query: ""
            },
            pagination: {
                page: 1,
                perPage: 10
            }
        };
        try {
            const result = await API.post(
                'patients/list',
                requestBody
            );
            if (result.data.status === "success") {
                setLoading(false);
                dispatch(setPatientList(result.data?.data?.rows || []));
                return;
            }
        } catch (err) {
            setLoading(false);
            console.log('Get Patients Err:::', err.message);
        }
        return [];
    }
    useEffect(() => {
        getPatients();
    }, [])
    return (
        <>
            <AddPatientForm getPatients={getPatients} setLoading={setLoading}/>
            {
                loading ? <h2>Loading</h2> : <Patients />
            }
        </>
    )
}

export default PatientListing
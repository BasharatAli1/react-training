import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Card from '../../card/Card';
import { API } from '../../../axios';

const PatientDetail = () => {
    const params = useParams();
    const [patient, setPatient] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const patientName = patient ? `${patient.name || ''} ${patient.lastName || ''}` : '';
    const getPatients = async () => {
        try {
            const result = await API.get(
                `patients/${params.id}`
            );
            if(result.data.status === "success") {
                setLoading(false);
                const patient = {
                    id: result.data.data.id,
                    status: result.data.data.status,
                    name: result.data.data.name,
                    lastName: result.data.data.surname,
                    email: result.data.data.email,
                    address1: result.data.data.address1,
                    city: result.data.data.city,
                    zipCode: result.data.data.zipCode,
                };
                setPatient(patient || {});
                return ;
            }
            return [];
        } catch (error) {
            console.log('getPatients', error.message);
        }
    }
    useEffect(() => {
        getPatients();
    }, []);
  return (
    <>
        {
            loading ? <h2>Loading</h2> : <Card heading={patientName} data={patient} />
        }
    </>
  )
}

export default PatientDetail
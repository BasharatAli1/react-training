import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getAccessToken } from '../../../utils/helper';
import Card from '../../card/Card';
import { API } from '../../../axios';

const ClinicDetail = () => {
    const params = useParams();
    const [clinic, setClinic] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const getClinic = async () => {
        const requestBody = {
            filters: {
                startDate: "2024-08-01",
                endDate: "2024-08-31",
                statuses: []
            },
            pagination: {
                page: 1,
                perPage: 10
            }
        };
        try {
            const result = await API.post(
                `clinics/dashboard/${params.id}`,
                requestBody
            );
            if(result.data.status === "success") {
                setLoading(false);
                const clinic = {
                    name: result.data.data.clinic.name,
                    email: result.data.data.clinic.email,
                    address1: result.data.data.clinic.clinicDetails.address1,
                    city: result.data.data.clinic.clinicDetails.city,
                    zipCode: result.data.data.clinic.clinicDetails.zipCode,
                }
                setClinic(clinic || {});
                return ;
            }
            return [];
        } catch (error) {
            console.log('333', error.message);
            // handle network error
        }
    }
    useEffect(() => {
        getClinic();
    }, [])
  return (
    <>
        {
            loading ? <h2>Loading</h2> : <Card heading={clinic.name} data={clinic} />
        }
    </>
  )
}

export default ClinicDetail
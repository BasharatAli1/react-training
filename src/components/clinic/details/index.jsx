import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ClinicDetail from './clinicDetail';
import { getAccessToken } from '../../../utils/helper';

const Detail = () => {
    const params = useParams();
    const [clinic, setClinic] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const getClinics = () => {
        const url = `http://127.0.0.0:3001/api/clinics/dashboard/${params.id}`;
        const accessToken = getAccessToken();
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
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken
                },
                body: JSON.stringify(requestBody),
            }).then(response => response.json())
                .then(result => {
                    if(result.status === "success") {
                        setLoading(false);
                        setClinic(result.data.clinic);
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
        getClinics();
    }, [])
  return (
    <>
        {
            loading ? <h2>Loading</h2> : <ClinicDetail clinic={clinic} />
        }
    </>
  )
}

export default Detail
import React, { useEffect, useState } from 'react'
import Clinics from './clinics';
import { useDispatch } from 'react-redux';
import { setClinicList } from '../../../slices/clinic';
import AddClinicForm from '../add clinic/addClinicForm';
import { getAccessToken } from '../../../utils/helper';

const ClinicListing = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const getClinics = () => {
        const url = 'http://127.0.0.0:3001/api/clinics/list';
        const accessToken = getAccessToken();
        const requestBody = {
            filters: {
                isNhsEnabled: null,
                invoiceable: null,
                startDate: "2024-08-01",
                endDate: "2024-08-31",
                query: ""
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
                redirect: 'follow'
            }).then(response => response.json())
                .then(result => {
                    if(result.status === "success") {
                        setLoading(false);
                        dispatch(setClinicList(result?.data?.rows || []));
                        return ;
                    }
                })
                .catch(error => console.log('error', error));
            return [];
        } catch (error) {
            console.log('GetClinics Err:', error.message);
            // handle network error
        }
    }
    useEffect(() => {
        getClinics();
    }, []);
  return (
    <>
        <div>Index - Clinic Listing</div>
        <AddClinicForm getClinics={getClinics} setLoading={setLoading}/>
        {
            loading ? <h2>Loading</h2> : <Clinics />
        }
    </>
  )
}

export default ClinicListing
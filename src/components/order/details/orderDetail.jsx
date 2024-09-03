import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getAccessToken } from '../../../utils/helper';
import Card from '../../card/Card';

const OrderDetail = () => {
    const params = useParams();
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getorder(order.id);
    }, []);
    const getorder = (id) => {
        const url = `http://127.0.0.0:3001/api/orders/${params.id}`;
        const accessToken = getAccessToken();
        try {
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken
                },
            }).then(response => response.json())
                .then(result => {
                    if(result.status === "success") {
                        const order = {
                            id: result.data.id,
                            orderNumber: result.data.orderNumber,
                            clinicName: result.data.clinic.name,
                            status: result.data.status,
                            patientName: `${result.data.patient.name} ${result.data.patient.surname}`,
                            patientEmail: `${result.data.patient.email}`,
                            address1: result.data.shippingAddress.address1,
                            city: result.data.shippingAddress.city,
                            zipCode: result.data.shippingAddress.zipCode,
                        };
                        setOrder(order);
                        setLoading(false);
                        return ;
                    }
                })
                .catch(error => console.log('error', error));
            return [];
        } catch (error) {
            console.log('333', error.message);
            // handle network error
        }
    };
    return (
        <>
            {loading ? <h2>Loading...</h2> : <Card heading={order.orderNumber} data={order} />}
        </>
    )
}

export default OrderDetail
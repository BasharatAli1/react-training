import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getAccessToken } from '../../../utils/helper';
import Card from '../../card/Card';
import { API } from '../../../axios';

const OrderDetail = () => {
    const params = useParams();
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getorder(order.id);
    }, []);
    const getorder = async (id) => {
        try {
            const result = await API.get(`/orders/${params.id}`);
            if(result.data.status === "success") {
                const order = {
                    id: result.data.data.id,
                    orderNumber: result.data.data.orderNumber,
                    clinicName: result.data.data.clinic.name,
                    status: result.data.data.status,
                    patientName: `${result.data.data.patient.name} ${result.data.data.patient.surname}`,
                    patientEmail: `${result.data.data.patient.email}`,
                    address1: result.data.data.shippingAddress.address1,
                    city: result.data.data.shippingAddress.city,
                    zipCode: result.data.data.shippingAddress.zipCode,
                };
                setOrder(order);
                setLoading(false);
                return ;
            }
            return [];
        } catch (error) {
            console.log('getOrder :::', error.message);
        }
    };
    return (
        <>
            {loading ? <h2>Loading...</h2> : <Card heading={order.orderNumber} data={order} />}
        </>
    )
}

export default OrderDetail
import React, { useEffect, useState } from 'react'
import OrderDetail from './orderDetail';
import { useParams } from 'react-router-dom';
import { getAccessToken } from '../../../utils/helper';

const Detail = () => {
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
                        setOrder(result.data);
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
            {loading ? <h2>Loading...</h2> : <OrderDetail order={order} />}
        </>
    )
}

export default Detail
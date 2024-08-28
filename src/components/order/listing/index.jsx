import React, { useEffect, useState } from 'react'
import OrderDetail from '../details/orderDetail';
import Orders from './orders';
import { connect, useDispatch } from 'react-redux';
import { setOrderList } from '../../../slices/order';
import AddOrderForm from '../add order/addOrderForm';
import { getAccessToken } from '../../../utils/helper';

const OrderList = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    
    const getOrders = () => {
        const url = 'http://127.0.0.0:3001/api/payment-link/list';
        const accessToken = getAccessToken();
        const requestBody = {
            filters: {
                clinicId :  null,
                isPublished :  null,
                patientId :  null,
                query :  "",
                status :  "",
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
        })
        .then(response => response.json())
        .then(result => {
            if(result.status === "success") {
                setLoading(false);
                const orders = [];
                result?.data?.rows.map(order => {
                    orders.push({
                        id: order.id,
                        orderNumber: order.orderNumber,
                        status: order.status,
                        patientName: `${order.patient.name} ${order.patient.surname}`,
                        patientEmail: `${order.patient.email}`
                    });
                });
                dispatch(setOrderList(orders || []));
                return ;
            }
        })
        .catch(error => console.log('error order list', error));
        return [];
    };

    useEffect(() => {
        getOrders();
    }, []);
    
    return (
        <>
            <AddOrderForm getOrders={getOrders} setLoading={setLoading} />
            {loading ? <h2>Loading...</h2> : <Orders />}
        </>
    )
}

export default OrderList

// const mapStateToProps = (state = {}) => {
// 	const { order = {} } = state;
// 	const orderObj = order;
// 	return {
// 		orderObj,
// 	};
// };

// export default connect(mapStateToProps)(OrderList);

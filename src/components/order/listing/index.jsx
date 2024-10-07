import React, { useEffect, useState } from 'react'
import Orders from './orders';
import { connect, useDispatch } from 'react-redux';
import { setOrderList } from '../../../slices/order';
import AddOrderForm from '../add order/addOrderForm';
import { getAccessToken } from '../../../utils/helper';
import { API } from '../../../axios';

const OrderList = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    
    const getOrders = async () => {
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
        try {
            const result = await API.post(
                '/payment-link/list',
                requestBody
            );
            if(result.data.status === "success") {
                setLoading(false);
                const orders = [];
                result.data?.data?.rows.map(order => {
                    orders.push({
                        id: order.id,
                        orderNumber: order.orderNumber,
                        status: order.status,
                        patientName: `${order.patient.name} ${order.patient.surname}`,
                        clinicName: order.clinic.name,
                        patientEmail: `${order.patient.email}`
                    });
                });
                dispatch(setOrderList(orders || []));
                return ;
            }
            return [];
        } catch(err) {
            console.log('getOrders :::', err);
        }
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

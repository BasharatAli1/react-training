import React, { useEffect, useState } from 'react'
import OrderDetail from '../details/orderDetail';
import Orders from './orders';
import { connect, useDispatch } from 'react-redux';
import { setOrderList } from '../../../slices/order';

const OrderList = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    
    const getorders = () => {
        const url = 'http://127.0.0.0:3001/api/orders/list';
        const requestBody = {
            filters: {
                clinicId :  null,
                isPublished :  null,
                patientId :  null,
                query :  "",
                refunded :  null,
                status :  "",
                waitingForPrescription :  null
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
                    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2IiOm51bGwsImlkIjoyLCJuYW1lIjoiQWxpIiwic3VybmFtZSI6IkJhc2hhcnQiLCJlbWFpbCI6ImJhc2hhcmF0QGNhbXAxLnRreGVsLmNvbSIsInN0YXR1cyI6ImFjdGl2ZSIsInRvdGFsTG9naW4iOjk3LCJyb2xlSWQiOjEsInJvbGUiOiJzdXBlcl9hZG1pbiIsImxhYmVsIjoiU3VwZXIgQWRtaW4iLCJncm91cCI6InN1cGVyX2FkbWluIiwiY2l0eSI6bnVsbCwic3RhdGUiOm51bGwsImNvdW50cnlJZCI6bnVsbCwiemlwQ29kZSI6bnVsbCwicGhvbmUiOm51bGwsImdlbmRlciI6bnVsbCwiaW1hZ2UiOm51bGwsImFkZHJlc3MxIjoiVGt4ZWwgQ2FuYWwgY2FtcHVzIiwiYWRkcmVzczIiOiJUa3hlbCBHdWxiZXJnIGNhbXB1cyIsImxhdGl0dWRlIjpudWxsLCJsb25naXR1ZGUiOm51bGwsImF1dGhvcml6YXRpb25Db2RlIjpudWxsLCJyeWZ0Q3VzdG9tZXJJZCI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyMy0wOC0yOFQwNjoyOTo0OS4wMDBaIiwibGFzdExvZ2luIjoiMjAyNC0wOC0xNlQwOTo1MzoyMi45OTVaIiwidXBkYXRlZEF0IjoiMjAyNC0wOC0xNlQwOTo1MzoyMi45OTZaIiwic2Vzc2lvbklkIjoiMTYzYzhhMTEtN2IwNS00MTQ3LTk4YTEtNjg1OTc4MDMyM2RiIiwiaWF0IjoxNzIzODAyMDAzLCJleHAiOjE3MzI0NDIwMDN9.3_DebVbl3yiOyR6YP-asIZHkl2jTkZi72Uc5Dq-9mIo'
                },
                body: JSON.stringify(requestBody),
                redirect: 'follow'
            }).then(response => response.json())
                .then(result => {
                    if(result.status === "success") {
                        setLoading(false);
                        dispatch(setOrderList(result?.data?.rows || []));
                        return ;
                    }
                })
                .catch(error => console.log('error order list', error));
            return [];
        } catch (error) {
            console.log('333', error.message);
            // handle network error
        }
    };

    useEffect(() => {
        getorders();
    }, []);
    
    return (
        <>
            <div>Index - Order Listing</div>
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

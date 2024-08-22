import React, { useEffect, useState } from 'react'
import OrderDetail from '../details/orderDetail';
import { useSelector } from 'react-redux';

const Orders = () => {
    const orderList = useSelector(state => state.orders.orderList);
    return (
        <>
            <div>Order Listing</div>
            {
                orderList.map((order)=> {
                    return <OrderDetail order={order} key={order.id} showLink={true} />
                })
            }
        </>
    )
}

export default Orders
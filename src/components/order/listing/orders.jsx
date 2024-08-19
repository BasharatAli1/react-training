import React, { useEffect, useState } from 'react'
import OrderDetail from '../details/orderDetail';

const Orders = ({ orders }) => {
    return (
        <>
            <div>Order Listing</div>
            {
                orders.map((order)=> {
                    return <OrderDetail order={order} key={order.id} showLink={true} />
                })
            }
        </>
    )
}

export default Orders
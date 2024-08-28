import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Table from '../../table/Table';

const Orders = () => {
    const orderList = useSelector(state => state.orders.orderList);
    return (
        <>
            <Table headers={['orderNumber', 'status', 'patientName', 'patientEmail']} dataArr={orderList} type='orders' />
        </>
    )
}

export default Orders
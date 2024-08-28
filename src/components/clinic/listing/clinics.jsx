import React from 'react'
import { useSelector } from 'react-redux';
import Table from '../../table/Table';

const Clinics = () => {
    const clinicList = useSelector(state => state.clinics.clinicList)
    return (
        <>
            <Table headers={['id', 'name', 'status', 'email', 'phone']} dataArr={clinicList}  type='clinics' />
        </>
    )
}

export default Clinics
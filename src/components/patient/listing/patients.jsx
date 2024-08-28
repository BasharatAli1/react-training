import React from 'react'
import { useSelector } from 'react-redux';
import Table from '../../table/Table';

const Patients = () => {
    const patientList = useSelector(state => state.patients.patientList);
    
  return (
    <>
        {
            <Table headers={['id', 'name', 'surname', 'email']} dataArr={patientList}  type='patients' />
        }
    </>
  )
}

export default Patients
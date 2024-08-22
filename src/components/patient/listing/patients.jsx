import React, { useEffect, useState } from 'react'
import PatientDetail from '../details/patientDetail'
import { useSelector } from 'react-redux';

const Patients = ({ patients }) => {
    const patientList = useSelector(state => state.patients.patientList);
    console.log("Patient Listing");
    
  return (
    <>
        <div>Patient Listing</div>
        {
            patientList.map((patient)=> 
                <PatientDetail patient={patient} key={patient.id} showLink={true} />
            )
        }
    </>
  )
}

export default Patients
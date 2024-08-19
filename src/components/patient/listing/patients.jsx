import React, { useEffect, useState } from 'react'
import PatientDetail from '../details/patientDetail'

const Patients = ({ patients }) => {
    console.log("Patient Listing");
    
  return (
    <>
            <div>Patient Listing</div>
        {
            patients.map((patient)=> 
                <PatientDetail patient={patient} key={patient.id} showLink={true} />
            )
        }
    </>
  )
}

export default Patients
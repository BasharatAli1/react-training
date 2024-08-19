import React, { useEffect, useState } from 'react'
import ClinicDetail from '../details/clinicDetail'

const Clinics = ({ clinics }) => {
    console.log("Clinic Listing");
    
  return (
    <>
            <div>Clinic Listing</div>
        {
            clinics.map((clinic)=> 
                <ClinicDetail clinic={clinic} key={clinic.id} showLink={true} />
            )
        }
    </>
  )
}

export default Clinics
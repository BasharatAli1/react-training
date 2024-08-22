import React, { useEffect, useState } from 'react'
import ClinicDetail from '../details/clinicDetail'
import { useSelector } from 'react-redux';

const Clinics = () => {
    console.log("Clinic Listing");
    const clinicList = useSelector(state => state.clinics.clinicList)
    
  return (
    <>
            <div>Clinic Listing</div>
        {
            clinicList.map((clinic)=> 
                <ClinicDetail clinic={clinic} key={clinic.id} showLink={true} />
            )
        }
    </>
  )
}

export default Clinics
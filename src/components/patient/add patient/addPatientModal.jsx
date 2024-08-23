import React, { useState } from 'react'
import Dialog from '../../dialog/dialog'
import AddPatientForm from './addPatientForm';

const AddPatientModal = (props) => {
    const patientDataObj = {
        name: '',
        surname: '',
        email: '',
        gender: '',
        dob: '',
        phone: '',
    };
    const [patientData, setPatientData] = useState(patientDataObj);
    const handlePatientData = (data) => {
        console.log(' handlePatientData ......', data);
        console.log('.. On Close ..');
        props.onSubmit(patientData);
        setPatientData(data);
        props.onClose();
    }
    const handleFormSubmit = (data) => {
    }
    return (
        <>
            <Dialog
                title='Add Patient'
                // onSubmit={handleFormSubmit}
            >
                <AddPatientForm onSubmit={handlePatientData}/>
            </Dialog>
        </>
    )
}

export default AddPatientModal
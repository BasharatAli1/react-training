import React, { useRef, useState } from 'react'
import Dialog from '../../dialog/dialog';

const AddPatientForm = () => {
    const nameRef = useRef();
    const surnameRef = useRef();
    const emailRef = useRef();
    const genderRef = useRef();
    const dobRef = useRef();
    const phoneRef = useRef();
    const patientDataObj = {
        name: '',
        surname: '',
        email: '',
        gender: '',
        dob: '',
        phone: '',
        address1: "12 Brackley Road",
        city: "Tibberton",
        countryId: 225,
        zipCode: "GL19 1QF"
    };
    const [patientData, setPatientData] = useState(patientDataObj);
    console.log('Patient Data', patientData);
    const [showAddPatientModal, setShowAddPatientModal] = useState(false);
    const closeAddPatientModal = () => {
        setShowAddPatientModal(false);
    }
    const handleFormSubmit = () => {
        setPatientData({
            ...patientDataObj,
            name: nameRef?.current?.value || '',
            surname: surnameRef?.current?.value || '',
            email: emailRef?.current?.value || '',
            gender: genderRef?.current?.value || '',
            dob: dobRef?.current?.value || '',
            phone: phoneRef?.current?.value || ''
        });
        setShowAddPatientModal(false);
    }
    // const handleInputChange = (event) => {
    //     const {name, value} = event.target;
    //     console.log(name, value);
        
    //     setPatientData((prevFormData) => ({
    //         ...prevFormData,
    //         [name]: value,
    //     }));
    // }
    const requiredStyle = {
        color: 'red',
        fontWeight: 'bold',
    }
    return (
        <>
            <button onClick={() => setShowAddPatientModal(true)}>Add Patient</button>
            <Dialog
                title='Add Patient'
                onSubmit={handleFormSubmit}
                onClose={closeAddPatientModal}
                hasCloseBtn={true}
                hasSubmitBtn={true}
                isOpen={showAddPatientModal}
            >
                <label htmlFor="">Name <span style={requiredStyle}>*</span>
                    <input
                        type="text"
                        placeholder='Enter Name'
                        ref={nameRef}
                        // name="name"
                        // value={patientData.name}
                        // onChange={handleInputChange}
                    />
                </label>
                <br />
                <label htmlFor="">Surname <span style={requiredStyle}>*</span>
                    <input
                        type="text"
                        placeholder='Enter Surname'
                        ref={surnameRef}
                        // name="surname"
                        // value={patientData.surname}
                        // onChange={handleInputChange}
                    />
                </label>
                <br />
                <label htmlFor="">Email <span style={requiredStyle}>*</span>
                    <input
                        type="text"
                        placeholder='Enter Email'
                        ref={emailRef}
                        // name="email"
                        // value={patientData.email}
                        // onChange={handleInputChange}
                    />
                </label>
                <br />
                <label htmlFor="">Gender
                    <select ref={genderRef}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </label>
                <br />
                <label htmlFor="">DOB <span style={requiredStyle}>*</span>
                    <input
                        type="text"
                        placeholder='DD-MM-YYY'
                        ref={dobRef}
                        // name="dob"
                        // value={patientData.dob}
                        // onChange={handleInputChange}
                    />
                </label>
                <br />
                <label htmlFor="">Phone #
                    <input
                        type="text"
                        placeholder='Enter Phone'
                        ref={phoneRef}
                        // name="phone"
                        // value={patientData.phone}
                        // onChange={handleInputChange}
                    />
                </label>
            </Dialog>
        </>
    )
}

export default AddPatientForm
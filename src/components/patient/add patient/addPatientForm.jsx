import React, { useRef, useState } from 'react'
import Dialog from '../../dialog/dialog';
import { getAccessToken } from '../../../utils/helper';

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
    const [borderStyle, setBorderStyle] = useState({});
    const [showAddPatientModal, setShowAddPatientModal] = useState(false);
    const closeAddPatientModal = () => {
        setShowAddPatientModal(false);
    }
    const handleFormSubmit = () => {
        
        const name = nameRef?.current?.value.trim() || '';
        const surname = surnameRef?.current?.value.trim() || '';
        const email = emailRef?.current?.value.trim() || '';
        const gender = genderRef?.current?.value.trim() || '';
        const dob = dobRef?.current?.value.trim() || '';
        const phone = phoneRef?.current?.value.trim() || '';
        setPatientData({
            ...patientDataObj,
            name,
            surname,
            email,
            gender,
            dob,
            phone
        });
        const newBorderStyle = {};
        if(!name) {
            newBorderStyle.name = { border: '2px solid red' };
        }
        if(!surname) {
            newBorderStyle.surname = { border: '2px solid red' };
        }
        // Regular expression to check if email format is valid
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!email || !emailPattern.test(email)) {
            newBorderStyle.email = { border: '2px solid red' };
        }
        if(!dob) {
            newBorderStyle.dob = { border: '2px solid red' };
        }
        setBorderStyle(newBorderStyle);
        
        if (Object.keys(newBorderStyle).length !== 0) {
            return; // Prevent form submission if any field is empty
        }
        setBorderStyle({});
        addPatient(patientData);
        setShowAddPatientModal(false);
    }

    const addPatient = (patientData) => {
        const url = `http://127.0.0.0:3001/api/patients`;
        const requestBody = patientData;
        const accessToken = getAccessToken();
        try {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken
                },
                body: JSON.stringify(requestBody),
                redirect: 'follow'
            }).then(response => response.json())
                .then(result => {
                    if(result.status === "success") {
                        setLoading(false);
                        setClinic(result.data.clinic);
                        return ;
                    }
                })
                .catch(error => console.log('error', error));
            return [];
        } catch (error) {
            console.log('addPatient Err :::', error.message);
        }
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
                        style={borderStyle.name}
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
                        style={borderStyle.surname}
                        // name="surname"
                        // value={patientData.surname}
                        // onChange={handleInputChange}
                    />
                </label>
                <br />
                <label htmlFor="">Email <span style={requiredStyle}>*</span>
                    <input
                        type="email"
                        placeholder='Enter Email'
                        ref={emailRef}
                        style={borderStyle.email}
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
                        style={borderStyle.dob}
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
import React, { useRef, useState } from 'react'
import Dialog from '../../dialog/dialog';
import { API } from '../../../axios';

const AddPatientForm = ({ getPatients, setLoading }) => {
    const nameRef = useRef();
    const surnameRef = useRef();
    const emailRef = useRef();
    const genderRef = useRef();
    const dobRef = useRef();
    const phoneRef = useRef();
    const [borderStyle, setBorderStyle] = useState({});
    const [showAddPatientModal, setShowAddPatientModal] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    
    const closeAddPatientModal = () => {
        setShowAddPatientModal(false);
    }
    const resetBorderStyle = (event) => {
        const { name, value } = event.target;
        setBorderStyle({...borderStyle, [name]: {}});
    }
    const handleFormSubmit = () => {
        const name = nameRef?.current?.value.trim() || '';
        const surname = surnameRef?.current?.value.trim() || '';
        const email = emailRef?.current?.value.trim() || '';
        const gender = genderRef?.current?.value.trim() || '';
        const dob = dobRef?.current?.value.trim() || '';
        const phone = phoneRef?.current?.value.trim() || '';
        const patientDataObj = {
            name,
            surname,
            email,
            gender,
            dob,
            phone,
            address1: "12 Brackley Road",
            city: "Tibberton",
            countryId: 225,
            zipCode: "GL19 1QF"
        };
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
        addPatient(patientDataObj);
    }

    const addPatient = async (patientData) => {
        const requestBody = patientData;
        setLoading(true);
        try {
            const result = await API.post(
                'patients',
                requestBody
            );
            console.log('result.data.status', result.data.status);
            
            if(result.data.status === "success") {
                setShowAddPatientModal(false);
                getPatients();
                setLoading(false);
                return ;
            }
        } catch (err) {
                setLoading(false);
                console.log('addPatient Err :::', err);
                setResponseMessage(`Error: ${err.response.data?.message}`);
                return ;
            
        }
        return [];
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
            <button className='info-button' onClick={() => setShowAddPatientModal(true)}>Add Patient</button>
            <Dialog
                title='Add Patient'
                onSubmit={handleFormSubmit}
                onClose={closeAddPatientModal}
                hasCloseBtn={true}
                hasSubmitBtn={true}
                isOpen={showAddPatientModal}
            >
                <div className="dialog-form-container">
                    {responseMessage && <span className="error-message">{responseMessage}</span>}
                    <label className="dialog-label" htmlFor="">Name <span style={requiredStyle}>*</span>
                        <input
                            type="text"
                            name='name'
                            placeholder='Enter Name'
                            ref={nameRef}
                            onChange={resetBorderStyle}
                            className="dialog-input-field"
                            style={borderStyle.name}
                            // name="name"
                            // value={patientData.name}
                            // onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label className="dialog-label" htmlFor="">Surname <span style={requiredStyle}>*</span>
                        <input
                            type="text"
                            name='surname'
                            placeholder='Enter Surname'
                            ref={surnameRef}
                            onChange={resetBorderStyle}
                            className="dialog-input-field"
                            style={borderStyle.surname}
                            // name="surname"
                            // value={patientData.surname}
                            // onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label className="dialog-label" htmlFor="">Email <span style={requiredStyle}>*</span>
                        <input
                            type="email"
                            name='email'
                            placeholder='Enter Email'
                            ref={emailRef}
                            onChange={resetBorderStyle}
                            className="dialog-input-field"
                            style={borderStyle.email}
                            // name="email"
                            // value={patientData.email}
                            // onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label className="dialog-label" htmlFor="">Gender
                        <select
                            ref={genderRef}
                            className="dialog-select-field"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </label>
                    <br />
                    <label className="dialog-label" htmlFor="">DOB <span style={requiredStyle}>*</span>
                        <input
                            type="text"
                            name='dob'
                            placeholder='YYYY-MM-DD'
                            ref={dobRef}
                            onChange={resetBorderStyle}
                            className="dialog-input-field"
                            style={borderStyle.dob}
                            // name="dob"
                            // value={patientData.dob}
                            // onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label className="dialog-label" htmlFor="">Phone #
                        <input
                            type="number"
                            placeholder='Enter Phone'
                            ref={phoneRef}
                            className="dialog-input-field"
                            // name="phone"
                            // value={patientData.phone}
                            // onChange={handleInputChange}
                        />
                    </label>
                </div>
            </Dialog>
        </>
    )
}

export default AddPatientForm
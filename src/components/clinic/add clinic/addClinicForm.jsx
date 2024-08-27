import React, { useRef, useState } from 'react'
import Dialog from '../../dialog/dialog';
import { getAccessToken } from '../../../utils/helper';

const AddClinicForm = ({ getClinics, setLoading }) => {
    const nameRef = useRef();
    const emailRef = useRef();
    const contactRef = useRef();
    const [borderStyle, setBorderStyle] = useState({});
    const [showAddClinicModal, setShowAddClinicModal] = useState(false);
    const closeAddClinicModal = () => {
        setShowAddClinicModal(false);
    }
    const handleFormSubmit = () => {
        const name = nameRef?.current?.value.trim() || '';
        const email = emailRef?.current?.value.trim() || '';
        const contact = contactRef?.current?.value.trim() || '';
        const clinicDataObj = {
            name: name,
            email: email,
            contact: contact,
            address1: "12 Brackley Road",
            city: "Tibberton",
            countryId: 225,
            zipCode: "GL19 1QF"
        };
        const newBorderStyle = {};
        if(!name) {
            newBorderStyle.name = { border: '2px solid red' };
        }
        // Regular expression to check if email format is valid
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!email || !emailPattern.test(email)) {
            newBorderStyle.email = { border: '2px solid red' };
        }
        setBorderStyle(newBorderStyle);
        
        if (Object.keys(newBorderStyle).length !== 0) {
            return; // Prevent form submission if any field is empty
        }
        setBorderStyle({});
        addClinic(clinicDataObj);
        setShowAddClinicModal(false);
    }

    const addClinic = (clinicData) => {
        const url = `http://127.0.0.0:3001/api/clinics`;
        const requestBody = clinicData;
        const accessToken = getAccessToken();
        setLoading(true);
        try {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken
                },
                body: JSON.stringify(requestBody),
            }).then(response => response.json())
                .then(result => {
                    if(result.status === "success") {
                        getClinics();
                        setLoading(true);
                        return ;
                    }
                })
                .catch(error => console.log('error', error));
            return [];
        } catch (error) {
            setLoading(false);
            console.log('addClinic Err :::', error.message);
        }
    }
    const requiredStyle = {
        color: 'red',
        fontWeight: 'bold',
    }
    return (
        <>
            <button onClick={() => setShowAddClinicModal(true)}>Add Clinic</button>
            <Dialog
                title='Add Clinic'
                onSubmit={handleFormSubmit}
                onClose={closeAddClinicModal}
                hasCloseBtn={true}
                hasSubmitBtn={true}
                isOpen={showAddClinicModal}
            >
                <label htmlFor="">Clinic Name <span style={requiredStyle}>*</span>
                    <input
                        type="text"
                        placeholder='Enter Name'
                        ref={nameRef}
                        style={borderStyle.name}
                    />
                </label>
                <br />
                <label htmlFor="">Email <span style={requiredStyle}>*</span>
                    <input
                        type="email"
                        placeholder='Enter Email'
                        ref={emailRef}
                        style={borderStyle.email}
                    />
                </label>
                <br />
                <label htmlFor="">Contact #
                    <input
                        type="text"
                        placeholder='Enter Contact'
                        ref={contactRef}
                    />
                </label>
            </Dialog>
        </>
    )
}

export default AddClinicForm
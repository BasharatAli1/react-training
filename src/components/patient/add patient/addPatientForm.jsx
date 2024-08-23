import React, { useState } from 'react'

const AddPatientForm = (props) => {
    const patientDataObj = {
        name: '',
        surname: '',
        email: '',
        gender: '',
        dob: '',
        phone: '',
    };
    const [formState, setFormState] = useState(patientDataObj);
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormState((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    const handleSubmit = (event) => {
        console.log('>>> formState', formState);
        event.preventDefault();
        // onSubmit(formState);
        props.onSubmit(formState);
        setFormState(patientDataObj);
        
    }
    const requiredStyle = {
        color: 'red',
        fontWeight: 'bold',
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Name <span style={requiredStyle}>*</span>
                    <input
                        type="text"
                        name="name"
                        value={formState.name}
                        placeholder='Enter Name'
                        onChange={handleInputChange}
                        // require
                    />
                </label>
                <br />
                <label htmlFor="">Surname <span style={requiredStyle}>*</span>
                    <input
                        type="text"
                        name="surname"
                        value={formState.surname}
                        placeholder='Enter Surname'
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label htmlFor="">Email <span style={requiredStyle}>*</span>
                    <input
                        type="text"
                        name="email"
                        value={formState.email}
                        placeholder='Enter Email'
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label htmlFor="">Gender
                    <select>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </label>
                <br />
                <label htmlFor="">DOB <span style={requiredStyle}>*</span>
                    <input
                        type="text"
                        name="dob"
                        value={formState.dob}
                        placeholder='DD-MM-YYY'
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label htmlFor="">Phone #
                    <input
                        type="text"
                        name="phone"
                        value={formState.phone}
                        placeholder='Enter Phone'
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default AddPatientForm
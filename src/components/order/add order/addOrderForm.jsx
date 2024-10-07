import React, { useState } from 'react'
import Dialog from '../../dialog/dialog';
import { getAccessToken } from '../../../utils/helper';
import { API } from '../../../axios';

const AddOrderForm = ({ getOrders, setLoading }) => {
    const [patientList, setPatientList] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState('');
    const [selectedClinic, setSelectedClinic] = useState('');
    const [clinicList, setClinicList] = useState([]);
    const [doctorList, setDoctorList] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [medicineList, setMedicineList] = useState([]);
    const [selectedMedicine, setSelectedMedicine] = useState('');
    const [medicineQty, setMedicineQty] = useState('');
    const [medicineTotal, setMedicineTotal] = useState(0);
    const [borderStyle, setBorderStyle] = useState({});
    const [showAddOrderModal, setShowAddOrderModal] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const closeAddOrderModal = () => {
        setShowAddOrderModal(false);
    }
    const handlePatientNameChange = (event) => {
        console.log('event.target.value', event.target.value);
        shortApiCall('patients/short-patients', event.target.value, 'patient');
    }
    const handlePatientSelectChange = (event) => {
        setSelectedPatient(event.target.value);
        setBorderStyle({...borderStyle, patient: {}});
    };
    const handleClinicSelectChange = (event) => {
        setSelectedClinic(event.target.value);
        setBorderStyle({...borderStyle, clinic: {}});
    };
    const handleClinicNameChange = (event) => {
        shortApiCall('clinics/short-clinics', event.target.value, 'clinic');
    }
    const handleDoctorNameChange = (event) => {
        shortApiCall('patients/short-patients', event.target.value, 'doctor');
    }
    const handleDoctorSelectChange = (event) => {
        setSelectedDoctor(event.target.value);
        console.log('SET', event.target.value);
        
        setBorderStyle({...borderStyle, doctor: {}});
    };
    const handleMedicineNameChange = (event) => {
        if(event.target.value.length > 1) {
            medicineSearchApiCall(event.target.value);
        }
    }
    const handleMedicineSelectChange = (event) => {
        setSelectedMedicine(event.target.value);
        setMedicineTotal(0);
        setMedicineQty('');
        setBorderStyle({...borderStyle, medicine: {}});
    };
    const handleMedicineQty = (event) => {
        setMedicineQty(event.target.value);
        setMedicineTotal(Number(JSON.parse(selectedMedicine).price)*Number(event.target.value));
        setBorderStyle({...borderStyle, medicineQty: {}});
    };

    const handleFormSubmit = () => {
        const newBorderStyle = {};
        if(!selectedPatient) {
            newBorderStyle.patient = { border: '2px solid red' };
        }
        if(!selectedClinic) {
            newBorderStyle.clinic = { border: '2px solid red' };
        }
        if(!selectedDoctor) {
            newBorderStyle.doctor = { border: '2px solid red' };
        }
        if(!selectedMedicine) {
            newBorderStyle.medicine = { border: '2px solid red' };
        }
        if(selectedMedicine && !medicineQty) {
            newBorderStyle.medicineQty = { border: '2px solid red' };
        }
        setBorderStyle(newBorderStyle);
        
        if (Object.keys(newBorderStyle).length !== 0) {
            return; // Prevent form submission if any field is empty
        }
        setBorderStyle({});
        const medicine = JSON.parse(selectedMedicine);
        const patient = JSON.parse(selectedPatient);
        const doctor = JSON.parse(selectedDoctor);
        

        const orderDataObj = {
            patient: {
                name: patient?.name.trim(),
                surname: patient?.surname.trim(),
                email: patient?.email.trim(),
                dob: patient?.dob.trim(),
            },
            selectedPatientId: patient?.id,
            clinicId: selectedClinic || '',
            address: [{
                address1: "12 Brackley Road",
                city: "Tibberton",
                countryId: 225,
                zipCode: "GL19 1QF",
                type: "shipping"
            }],
            orderItems: [{
                dmdId: medicine?.ampps?.APPID?.toString() || medicine?.vmpps?.VPPID?.toString(),
                dmdType: medicine?.ampps ? 'ampp' : 'vmpp',
                dosage: '...',
                inStockQuantity: medicineQty,
                quantity: medicineQty,
                name: medicine?.productName || medicine?.NM,
                price: medicine.price,
                total: medicineTotal
            }],
            prescriber: {
                name: doctor.name,
                last_name: doctor.surname,
                registration_number: doctor.registrationNumber,
                id: doctor.id
            },
            paymentType: "payment_link",
        };
        console.log('OBJ :::', orderDataObj);
        addOrder(orderDataObj);
    }

    const addOrder = async (payload) => {
        const requestPayload = payload;
        setLoading(true);
        try {
            const result = await API.post(
                '/orders',
                requestPayload
            );
            console.log('result.data.status :::', result.data.status);
            
            if(result.data.status === "success") {
                getOrders();
                setLoading(false);
                setShowAddOrderModal(false);
                return ;
                return ;
            }
            return [];
        } catch(err) {
            setLoading(false);
            console.log('addOrder Err :::', err.message);
        }
    }

    const shortApiCall = async (endPoint, query, type) => {
        const reqBody = type === 'patient' ? { filters: {
                query
            } } : type === 'clinic' ? { filters: {
                isNhsEnabled: null,
                orderListingToggle: 1,
                query
            } } : { filters: {
                query,
                type: "prescriber"
            } };
        try {
            const result = await API.post(
                `/${endPoint}`,
                reqBody
            );
            if(result.data.status === "success") {
                if(type === 'patient') {
                    setPatientList(result.data?.data?.rows || []);
                } else if(type === 'clinic') {
                    setClinicList(result.data?.data?.rows || []);
                } else {
                    setDoctorList(result.data?.data?.rows || []);
                }
                return ;
            }
        } catch(err) {
            console.log('shortApiCall :::', err);
        }
        return [];
    }

    const medicineSearchApiCall = (query) => {
        const url = 'http://127.0.0.0:3001/api/orders/search-nhs-data';
        console.log('query :::', query);
        const accessToken = getAccessToken();
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            },
            body: JSON.stringify({ query }),
        })
        .then(response => response.json())
        .then(result => {
            if(result.status === "success") {
                setMedicineList(result?.data || []);
                return ;
            }
        })
        .catch(error => console.log('error', error));
        return [];
    }

    const requiredStyle = {
        color: 'red',
        fontWeight: 'bold',
    }

    return (
        <>
            <button className='info-button' onClick={() => setShowAddOrderModal(true)}>Add Order</button>
            <Dialog
                title='Add Order'
                onSubmit={handleFormSubmit}
                onClose={closeAddOrderModal}
                hasCloseBtn={true}
                hasSubmitBtn={true}
                isOpen={showAddOrderModal}
            >
                <div className="dialog-form-container">
                    {responseMessage && <span className="error-message">{responseMessage}</span>}
                    <label className="dialog-label" htmlFor="">Patient <span style={requiredStyle}>*</span>
                        <input
                            type="text"
                            placeholder="Search Patient"
                            onChange={handlePatientNameChange}
                            style={borderStyle.patient}
                            className="dialog-input-field"
                        />
                        {patientList.length > 0 && (
                            <select
                                id="patient"
                                value={selectedPatient}
                                onChange={handlePatientSelectChange}
                                style={borderStyle.name}
                                className="dialog-select-field"
                            >
                                <option value="" disabled>Select Patient</option>
                                {patientList.map(patient => (
                                    <option key={patient.id} value={JSON.stringify(patient)}>
                                        {patient.name} {patient.surname}
                                    </option>
                                ))}
                            </select>
                        )}
                                    
                    </label>
                    <br />
                    <label className="dialog-label" htmlFor="">Clinic <span style={requiredStyle}>*</span>
                        <input
                            type="text"
                            placeholder='Search Clinic'
                            onChange={handleClinicNameChange}
                            style={borderStyle.clinic}
                            className="dialog-input-field"
                        />
                        {clinicList.length > 0 && (
                            <select
                                id="clinic"
                                value={selectedClinic}
                                onChange={handleClinicSelectChange}
                                style={borderStyle.name}
                                className="dialog-select-field"
                            >
                                <option value="" disabled>Select Clinic</option>
                                {clinicList.map(clinic => (
                                    <option key={clinic.id} value={clinic.id}>
                                        {clinic.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </label>
                    <br />
                    <label className="dialog-label" htmlFor="">Doctor <span style={requiredStyle}>*</span>
                        <input
                            type="text"
                            placeholder='Search Doctor'
                            onChange={handleDoctorNameChange}
                            style={borderStyle.doctor}
                            className="dialog-input-field"
                        />
                        {doctorList.length > 0 && (
                            <select
                                id="doctor"
                                value={selectedDoctor}
                                onChange={handleDoctorSelectChange}
                                style={borderStyle.name}
                                className="dialog-select-field"
                            >
                                <option value="" disabled>Select Doctor</option>
                                {doctorList.map(doctor => (
                                    <option key={doctor.id} value={JSON.stringify(doctor)}>
                                        {doctor.name} {doctor.surname}
                                    </option>
                                ))}
                            </select>
                        )}
                    </label>
                    <br />
                    <label className="dialog-label" htmlFor="">Medicine <span style={requiredStyle}>*</span>
                        <input
                            type="text"
                            placeholder='Search Medicine'
                            onChange={handleMedicineNameChange}
                            style={borderStyle.medicine}
                            className="dialog-input-field"
                        />
                        {medicineList.length > 0 && (
                            <select
                                id="medicine"
                                value={selectedMedicine}
                                onChange={handleMedicineSelectChange}
                                style={borderStyle.name}
                                className="dialog-select-field"
                            >
                                <option value="" disabled>Select Medicine</option>
                                {medicineList.map(medicine => (
                                    <option key={medicine.APPID || medicine.VPPID} value={JSON.stringify(medicine)}>
                                        {medicine.productName || medicine.NM} - {medicine.price}
                                    </option>
                                ))}
                            </select>
                        )}
                    </label>
                    <br />
                    <label className="dialog-label" htmlFor="">Quantity
                        <input
                            type="number"
                            placeholder='Enter Quantity'
                            disabled={selectedMedicine?false:true}
                            onChange={handleMedicineQty}
                            value={medicineQty}
                            style={borderStyle.medicineQty}
                            className="dialog-input-field"
                        />
                    </label>
                    <label className="dialog-label" htmlFor="">Price
                        <input
                            type="text"
                            placeholder='Price'
                            value={medicineTotal}
                            className="dialog-input-field"
                            disabled
                        />
                    </label>
                </div>
            </Dialog>
        </>
    )
}

export default AddOrderForm
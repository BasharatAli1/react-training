import React, { useEffect, useState } from 'react'
import Dialog from '../../dialog/dialog';
import { getAccessToken } from '../../../utils/helper';

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
        console.log('DOCTOR :::', {
            name: doctor.name,
            last_name: doctor.surname || '...',
            registration_number: doctor.registrationNumber || '11111',
            id: doctor.id
        });
        

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
        setShowAddOrderModal(false);
    }

    const addOrder = (payload) => {
        const url = `http://127.0.0.0:3001/api/orders`;
        const requestPayload = payload;
        const accessToken = getAccessToken();
        setLoading(true);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            },
            body: JSON.stringify(requestPayload),
        })
        .then(response => response.json())
        .then(result => {
            if(result.status === "success") {
                getOrders();
                setLoading(false);
                return ;
            }
        })
        .catch(error => {
            setLoading(false);
            console.log('addOrder Err :::', error.message);
        });
        return [];
    }

    const shortApiCall = (endPoint, query, type) => {
        const url = 'http://127.0.0.0:3001/api/' + endPoint;
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
        const accessToken = getAccessToken();
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            },
            body: JSON.stringify(reqBody),
        })
        .then(response => response.json())
        .then(result => {
            if(result.status === "success") {
                if(type === 'patient') {
                    setPatientList(result?.data?.rows || []);
                } else if(type === 'clinic') {
                    setClinicList(result?.data?.rows || []);
                } else {
                    setDoctorList(result?.data?.rows || []);
                }
                return ;
            }
        })
        .catch(error => console.log('error', error));
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
            <button onClick={() => setShowAddOrderModal(true)}>Add Order</button>
            <Dialog
                title='Add Order'
                onSubmit={handleFormSubmit}
                onClose={closeAddOrderModal}
                hasCloseBtn={true}
                hasSubmitBtn={true}
                isOpen={showAddOrderModal}
            >
                <label htmlFor="">Patient <span style={requiredStyle}>*</span>
                    <input
                        type="text"
                        placeholder="Search Patient"
                        onChange={handlePatientNameChange}
                        style={borderStyle.patient}
                    />
                    {patientList.length > 0 && (
                        <select
                            id="patient"
                            value={selectedPatient}
                            onChange={handlePatientSelectChange}
                            style={borderStyle.name}
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
                <label htmlFor="">Clinic <span style={requiredStyle}>*</span>
                    <input
                        type="text"
                        placeholder='Search Clinic'
                        onChange={handleClinicNameChange}
                        style={borderStyle.clinic}
                    />
                    {clinicList.length > 0 && (
                        <select
                            id="clinic"
                            value={selectedClinic}
                            onChange={handleClinicSelectChange}
                            style={borderStyle.name}
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
                <label htmlFor="">Doctor <span style={requiredStyle}>*</span>
                    <input
                        type="text"
                        placeholder='Search Doctor'
                        onChange={handleDoctorNameChange}
                        style={borderStyle.doctor}
                    />
                    {doctorList.length > 0 && (
                        <select
                            id="doctor"
                            value={selectedDoctor}
                            onChange={handleDoctorSelectChange}
                            style={borderStyle.name}
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
                <label htmlFor="">Medicine <span style={requiredStyle}>*</span>
                    <input
                        type="text"
                        placeholder='Search Medicine'
                        onChange={handleMedicineNameChange}
                        style={borderStyle.medicine}
                    />
                    {medicineList.length > 0 && (
                        <select
                            id="medicine"
                            value={selectedMedicine}
                            onChange={handleMedicineSelectChange}
                            style={borderStyle.name}
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
                <label htmlFor="">Quantity
                    <input
                        type="text"
                        placeholder='Enter Quantity'
                        disabled={selectedMedicine?false:true}
                        onChange={handleMedicineQty}
                        value={medicineQty}
                        style={borderStyle.medicineQty}
                    />
                </label>
                <label htmlFor="">Price
                    <input
                        type="text"
                        placeholder='Price'
                        value={medicineTotal}
                        disabled
                    />
                </label>
                <br />
            </Dialog>
        </>
    )
}

export default AddOrderForm
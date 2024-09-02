import { Link } from 'react-router-dom';
import Card from '../../card/Card';

const PatientDetail = ({ patient }) => {
    console.log('PATIENT', patient);
    
    const patientName = `${patient.name || ''} ${patient.lastName || ''}`;
    return (
        <>
            <Card heading={patientName} data={patient} />
        </>
    )
}

export default PatientDetail
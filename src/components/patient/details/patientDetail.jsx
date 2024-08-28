import { Link } from 'react-router-dom';

const PatientDetail = ({ patient, showLink = false }) => {
    return (
        <>
            {
                showLink ?
                <Link to={`/patient/${patient.id}`}> 
                    <h2>{patient.id} - {patient.name} {patient.surname}</h2>
                </Link> :
                <h2>{patient.id}</h2>
            }
        </>
    )
}

export default PatientDetail
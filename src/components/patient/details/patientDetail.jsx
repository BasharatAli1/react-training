import { Link } from 'react-router-dom';

const PatientDetail = ({ patient, showLink = false }) => {
    return (
        <>
            {
                showLink ?
                <Link to={`/patient/${patient.id}`}> 
                    <h2 style={{ margin: "8px 0px" }}>{patient.id} - {patient.name} {patient.surname}</h2>
                </Link> :
                <h2 style={{ margin: "8px 0px" }}>{patient.id}</h2>
            }
        </>
    )
}

export default PatientDetail
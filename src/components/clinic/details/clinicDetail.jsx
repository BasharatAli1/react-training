import { Link } from 'react-router-dom';

const ClinicDetail = ({ clinic, showLink = false }) => {
    return (
        <>
            {
                showLink ?
                <Link to={`/clinic/${clinic.id}`}> 
                    <h2>{clinic.id} - {clinic.name}</h2>
                </Link> :
                <h2>{clinic.id}</h2>
            }
        </>
    )
}

export default ClinicDetail
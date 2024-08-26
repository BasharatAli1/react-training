import { Link } from 'react-router-dom';

const ClinicDetail = ({ clinic, showLink = false }) => {
    return (
        <>
            {
                showLink ?
                <Link to={`/clinic/${clinic.id}`}> 
                    <h2 style={{ margin: "8px 0px" }}>{clinic.id} - {clinic.name}</h2>
                </Link> :
                <h2 style={{ margin: "8px 0px" }}>{clinic.id}</h2>
            }
        </>
    )
}

export default ClinicDetail
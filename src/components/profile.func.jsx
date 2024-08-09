const Profile = ({ person }) => {
    return (
        <>
            <p><b>Name:</b> {person.name}</p>
            <p><b>Qualification:</b> {person.qualification}</p>
            <p><b>University:</b> {person.university}</p>
            <p><b>Designation:</b> {person.designation}</p>
            <p><b>Skills:</b> {person.skills}</p>
        </>
    )
};

export default Profile
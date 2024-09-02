import Card from "../../card/Card";

const ClinicDetail = ({ clinic }) => {
    return (
        <>
            <Card heading={clinic.name} data={clinic} />
        </>
    );
};

export default ClinicDetail;

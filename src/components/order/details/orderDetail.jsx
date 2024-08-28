import { Link } from 'react-router-dom';

const OrderDetail = ({ order, showLink = false }) => {
    return (
        <>
            {
                showLink ?
                <Link to={`/order/${order.id}`}> 
                    <h2>{order.id} - {order.patient.name} {order.patient.surname}</h2>
                </Link> :
                <h2>{order.id} - {order.patient.name} {order.patient.surname}</h2>
            }
        </>
    )
}

export default OrderDetail
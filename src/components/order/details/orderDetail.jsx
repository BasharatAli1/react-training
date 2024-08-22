import { Link } from 'react-router-dom';

const OrderDetail = ({ order, showLink = false }) => {
    return (
        <>
            <div>Orders - Detail</div>
            {
                showLink ?
                <Link to={`/order/${order.id}`}> 
                    <h2 style={{ margin: "8px 0px" }}>{order.id}</h2>
                </Link> :
                <h2 style={{ margin: "8px 0px" }}>{order.id}</h2>
            }
        </>
    )
}

export default OrderDetail
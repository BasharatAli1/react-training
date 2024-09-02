import Card from '../../card/Card';

const OrderDetail = ({ order }) => {
    return (
        <>
            <Card heading={order.orderNumber} data={order} />
        </>
    )
}

export default OrderDetail
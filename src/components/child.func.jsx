import { useEffect } from "react";

const ChildFunc = ({count}) => {
    useEffect(() => {
        console.log('02 Did Mount Called');
        return () => {
            console.log('04 Will Unmount Called');
        }
    }, [])
    useEffect(() => {
        console.log('03 Did Update Called');
    }, [count])
    console.log('01 Render Function Called');
    return (
        <p>Child Func Webhook Check Count: {count}</p>
    )
}

export default ChildFunc
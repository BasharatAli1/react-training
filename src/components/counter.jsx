import { useState } from "react";

const Counter = ({}) => {
    const [count, setCount] = useState(0);
    const increment = () => {
        setCount(count + 1);
    }
    const decrement = () => {
        setCount(count - 1);
    }
    return (
        <>
            <button onClick={increment}>+</button>
            <p>{count}</p>
            <button onClick={decrement}>-</button>
        </>
    )
}

export default Counter;
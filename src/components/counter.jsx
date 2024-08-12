import { useState } from "react";
import ChildFunc from "./child.func";
import ChildClass from "./child.class";

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
            {/* <ChildFunc count={count}></ChildFunc> */}
            {/* <ChildClass count={count}></ChildClass> */}
        </>
    )
}

export default Counter;
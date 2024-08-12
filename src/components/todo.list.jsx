import { useState } from "react"

const TodoList = ({}) => {
    const [state, setState] = useState({ name: 'name', description: 'desc' });
    console.log('STATE:', state);
    console.log('SET STATE:', setState);
    const name = state.name;
    const description = state.description;
    return (
        <>
            <p>Name: {name}</p>
            <p>Description: {description}</p>
        </>
    )
}

export default TodoList
import React, { useState } from 'react'

const Controlled = () => {
    const [name, setName] = useState('');
    const handleOnChange = (event ) => {
        console.log(event.target.value);
        setName(event.target.value);
    }
    // const handleSubmit = () => {
    //     if(!name) {
    //         alert('Error: Please enter a name!');
    //         return;
    //     }
    //     alert(`Name: ${name}`);
    // }
    return (
        <>
            <h1>Controlled Form</h1>
            {/* <form action="" onSubmit={handleSubmit}> */}
                <label htmlFor="name">
                    Name: 
                    <input type="text" value={name ?? ''} onChange={handleOnChange}/>
                </label>
                {/* <button type="submit">Submit</button> */}
                <button onClick={() => setName('Ali')}>
                    Set name as 'Ali'
                </button>
            {/* </form> */}
            {name !== '' && <p>Your name is {name}.</p>}
        </>
    )
}

export default Controlled
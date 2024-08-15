import React, { useRef, useState } from 'react'

const UnControlled = () => {
    let lastNameRef = useRef();
    const handleSubmit = () => {
        const firstName = document.getElementById("firstName").value;
        const lastName = lastNameRef.current.value;
        console.log('First Name:', firstName);
        console.log('Last Name:', lastName);
        alert(`Name: ${firstName} ${lastName}`);
    }
    return (
        <>
            <h1>UnControlled Form</h1>
            {/* <form action="" onSubmit={handleSubmit}> */}
                <label htmlFor="name">
                    First Name: <input id="firstName" type="text"/>
                </label>
                <br />
                <label htmlFor="name">
                    Last Name: <input ref={lastNameRef} type="text"/>
                </label>
                <br />
                <button type="submit" onClick={handleSubmit}>Submit</button>
            {/* </form> */}
        </>
    )
}

export default UnControlled
import React from 'react'

const Dialog = (props) => {
    
    const onCloseCall = () => {
        props.onSubmit();
    }
    return (
        <>
            <dialog open>
                <h1>{props.title}</h1>

                <button onClick={onCloseCall}>Close</button>
                <br/>
                <br/>
                {props.children}
            </dialog>
        </>
    )
}

export default Dialog
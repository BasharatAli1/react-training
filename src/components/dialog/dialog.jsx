import React from 'react'

const Dialog = ({ title, children, onSubmit, hasCloseBtn = true, hasSubmitBtn = false, isOpen, onClose }) => {
    
    return (
        <>
            <dialog open={isOpen}>
                <h1>{title}</h1>

                {hasCloseBtn && <button onClick={onClose}>Close</button>}
                <br/>
                <br/>
                {children}
                <br/>
                {hasSubmitBtn && <button type="submit" onClick={onSubmit}>Submit</button>}
            </dialog>
        </>
    )
}

export default Dialog
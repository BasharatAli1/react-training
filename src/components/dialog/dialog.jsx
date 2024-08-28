import React from 'react'
import '../../assets/css/dialog.css'

const Dialog = ({ title, children, onSubmit, hasCloseBtn = true, hasSubmitBtn = false, isOpen, onClose }) => {
    
    return (
        <>
            <dialog style={{ border: 'none'}} open={isOpen}>
                <h1>{title}</h1>

                {hasCloseBtn && <button onClick={onClose} className="close-button">Close</button>}
                <br/>
                <br/>
                {children}
                <br/>
                {hasSubmitBtn && <button type="submit" onClick={onSubmit} className="submit-button">Submit</button>}
            </dialog>
        </>
    )
}

export default Dialog
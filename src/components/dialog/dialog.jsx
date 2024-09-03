import React, { useEffect } from 'react';
import '../../assets/css/dialog.css';

const Dialog = ({ title, children, onSubmit, hasCloseBtn = true, hasSubmitBtn = false, isOpen, onClose }) => {
    
    useEffect(() => {
        // Toggle the 'dialog-open' class on the body element when the dialog is open
        if (isOpen) {
            document.body.classList.add('dialog-open');
        } else {
            document.body.classList.remove('dialog-open');
        }

        return () => {
            // Cleanup in case the component unmounts while the dialog is open
            document.body.classList.remove('dialog-open');
        };
    }, [isOpen]);

    return (
        <>
            {isOpen && <div className="dialog-overlay"></div>}
            <dialog className="dialog-container" style={{ border: 'none' }} open={isOpen}>
                <h1>{title}</h1>

                {hasCloseBtn && <button onClick={onClose} className="close-button">Close</button>}
                <br/>
                <br/>
                <div className="dialog-content">
                    {children}
                </div>
                <br/>
                {hasSubmitBtn && <button type="submit" onClick={onSubmit} className="submit-button">Submit</button>}
            </dialog>
        </>
    );
};

export default Dialog;

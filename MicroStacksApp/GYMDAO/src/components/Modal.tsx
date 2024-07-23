import React, { FC } from 'react'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
  }

const Modal: FC<ModalProps> = ({isOpen, onClose, children }) => {
    if (!isOpen) return null;
return ( 
    <div className="modal-overlay">
        <div className="modal">
            <button className="modal-close-btn" onClick={onClose}>Close</button>
            <div className="modal-content">
                {children}
            </div>
        </div>
    </div>
);
};
export default Modal;
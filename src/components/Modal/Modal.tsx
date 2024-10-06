import React, { ReactNode } from 'react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <>
    <div className="modal-overlay">

    <div className="modal-container">
        <div className="modal-header">
          {title && <h1 style={{fontSize:'18px', marginBottom: "12px"}}>{title}</h1>}
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
    </>
  );
};

export default Modal;

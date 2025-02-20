import type React from "react";
import "./ModalComponents/Modal.css";

interface ModalProps {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          {title && <h2>{title}</h2>}
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

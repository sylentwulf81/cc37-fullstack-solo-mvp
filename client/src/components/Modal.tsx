import React from "react";
import { useRef, useEffect, useState } from "react"; // allows React to reference values that are not strictly necessary for rendering

import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  hasCloseBtn?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const Modal = ({isOpen, hasCloseBtn, onClose, children}: ModalProps) => {
    /* uses the useRef Hook to create a refenence to the <dialog> HTML element */
  const modalRef =
    useRef<HTMLDialogElement>(
      null
    ); 

    useEffect( () => {
        const modalElement = modalRef.current;
        if (!modalElement) return 

        if (isOpen)
             {
            modalElement.showModal();
        } else {
            modalElement.close();
        }
    }, [isOpen])

  // begin React return
  return (
    <dialog ref={modalRef} className="modal">
      {children}
    </dialog>
  );
  // end React return
};

export default Modal;

/* this component should: 

- check open / closed state
- have a close button or some way to exit without interaction
- define some closing behaviou 
- handle any children appropriately

*/

import { useState } from "react";

// components
import Modal from "../Modal";

// About
import Version from "../ModalComponents/ModalSubComponents/02_About/Version";
import Credits from "../ModalComponents/ModalSubComponents/02_About/Credits";

// Help
import Documentation from "../ModalComponents/ModalSubComponents/03_Help/Documentation";
import FAQ from "../ModalComponents/ModalSubComponents/03_Help/FAQ";

// styles
import "../_root.css";
import "./ScriptHeader.css";

export default function ScriptHeader() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (modalName: string) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="script-menu-container">
      {/* File menu */}
      <div className="dropdown-container">
        <span className="script-header-element">File</span>
        <div className="dropdown-menu">
          <div className="dropdown-item save-option">Save</div>
          <div className="dropdown-item">Export as PDF</div>
        </div>
      </div>

      {/* About menu */}
      <div className="dropdown-container">
        <span className="script-header-element">About</span>
        <div className="dropdown-menu">
          <div className="dropdown-item" onClick={() => openModal("version")}>
            Version
          </div>
          <div className="dropdown-item" onClick={() => openModal("credits")}>
            Credits
          </div>
        </div>
      </div>

      {/* Help menu */}
      <div className="dropdown-container">
        <span className="script-header-element">Help</span>
        <div className="dropdown-menu">
          <div
            className="dropdown-item"
            onClick={() => openModal("documentation")}
          >
            Documentation
          </div>
          <div className="dropdown-item" onClick={() => openModal("faq")}>
            FAQ
          </div>
          <div className="dropdown-separator"></div>
          <div className="dropdown-item">Contact Support</div>
        </div>
      </div>

      {activeModal && (
        <Modal title={activeModal} onClose={closeModal}>
          {activeModal === "version" && <Version />}
          {activeModal === "credits" && <Credits />}
          {activeModal === "documentation" && <Documentation />}
          {activeModal === "faq" && <FAQ />}
        </Modal>
      )}
    </div>
  );
}

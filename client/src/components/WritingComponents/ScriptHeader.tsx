import { useState, useEffect } from "react";
import jsPDF from "jspdf";

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

const STORAGE_KEY = "script_hero_content";

export default function ScriptHeader() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);

  useEffect(() => {
    // Check if there's content in localStorage
    const content = localStorage.getItem(STORAGE_KEY);
    if (content) {
      setLastSaved(new Date());
    }
  }, []);

  const openModal = (modalName: string) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleSave = () => {
    // For now, this just updates the last saved timestamp
    // since content is automatically saved to localStorage
    setLastSaved(new Date());
  };

  const handleClearAll = () => {
    setShowClearConfirmation(true);
  };

  const confirmClear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setShowClearConfirmation(false);
    // Forces a page reload to clear the editor
    // TODO currently sets the page to the static front page, needs to reload to the editor
    window.location.reload();
  };

  const saveAsPDF = () => {
    // Create new PDF document
    const doc = new jsPDF({
      unit: "pt",
      format: "letter",
      orientation: "portrait",
    });

    // Get the preview content
    const previewElement = document.querySelector(".script-preview-textarea");
    if (!previewElement) {
      console.error("Preview element not found");
      return;
    }

    // Calculate dimensions (letter size: 8.5" x 11")
    const pageWidth = doc.internal.pageSize.getWidth();
    const leftMargin = 10;
    const topMargin = 10;
    const rightMargin = 40;
    const bottomMargin = 40;
    const contentWidth = pageWidth - (leftMargin + rightMargin);

    // Configure PDF options
    const options = {
      margin: [topMargin, rightMargin, bottomMargin, leftMargin], // [top, right, bottom, left]
      html2canvas: {
        scale: 0.75,
        letterRendering: true,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: contentWidth,
      },
      callback: function (pdf: jsPDF) {
        // Set document properties before saving
        doc.setProperties({
          title: "Script_Hero Script",
          subject: "Comic Book Script",
          author: "Script_Hero",
          keywords: "comic script, script hero",
          creator: "Script_Hero",
        });

        pdf.save("script.pdf");
      },
    };

    // Convert and save
    doc.html(previewElement as HTMLElement, options);
  };

  return (
    <div className="script-menu-container">
      {/* File menu */}
      <div className="dropdown-container">
        <span className="script-header-element">File</span>
        <div className="dropdown-menu">
          <div className="dropdown-item save-option" onClick={handleSave}>
            Save
          </div>
          <div className="dropdown-item" onClick={saveAsPDF}>
            Export as PDF
          </div>
          <div className="dropdown-separator"></div>
          <div className="dropdown-item warning" onClick={handleClearAll}>
            Clear All
          </div>
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

      {/* Last saved indicator */}
      {lastSaved && (
        <div className="last-saved-indicator">
          Last saved: {lastSaved.toLocaleTimeString()}
        </div>
      )}

      {/* Clear All Confirmation Modal */}
      {showClearConfirmation && (
        <Modal
          title="Clear All"
          onClose={() => setShowClearConfirmation(false)}
        >
          <div className="confirmation-modal">
            <p>
              Are you sure you want to clear all content? This cannot be undone.
            </p>
            <div className="confirmation-buttons">
              <button className="button-global" onClick={confirmClear}>
                Yes, Clear All
              </button>
              <button
                className="button-global"
                onClick={() => setShowClearConfirmation(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

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

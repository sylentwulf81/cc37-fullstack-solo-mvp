import type React from "react"
import { useState } from "react"

// components
import Modal from "./Modal"
import AboutScriptHero from "./ModalComponents/AboutScriptHero"
import RegisterForm from "./ModalComponents/RegisterForm"
import ContactForm from "./ModalComponents/ContactForm"
import LoginForm from "./ModalComponents/LoginForm"

// styling
import "./Header.css"

const Header: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const openModal = (modalName: string) => {
    setActiveModal(modalName)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  return (
      <header className="header">
        <nav className="nav">
          <ul className="nav-list">
            <li>
              <button onClick={() => openModal("login")}>Login</button>
            </li>
            <li>
              <button onClick={() => openModal("register")}>Register</button>
            </li>
            <li>
              <button onClick={() => openModal("about")}>About</button>
            </li>
            <li>
              <button onClick={() => openModal("contact")}>Contact Us</button>
            </li>
          </ul>
        </nav>
        {activeModal && (
            <Modal title={activeModal} onClose={closeModal}>
              {/* Modal content based on activeModal */}
              {activeModal === "login" && <LoginForm />}
              {activeModal === "register" && <RegisterForm />}
              {activeModal === "about" && <AboutScriptHero />}
              {activeModal === "contact" && <ContactForm />}
            </Modal>
        )}
      </header>
  )
}

export default Header



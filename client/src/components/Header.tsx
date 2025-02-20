import type React from "react";
import { useState, useEffect } from "react";

// components
import Modal from "./Modal";
import Toast from "./Toast";
import AboutScriptHero from "./ModalComponents/AboutScriptHero";
import RegisterForm from "./ModalComponents/RegisterForm";
import ContactForm from "./ModalComponents/ContactForm";
import LoginForm from "./ModalComponents/LoginForm";

// profile display handling
import UserProfile from "./ModalComponents/UserProfile";

// styling
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error" | "info";
  }>({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    // check if any user data already exists in localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUsername(user.username);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const openModal = (modalName: string) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleLogout = async () => {
    try {
      // Call logout endpoint to clear the cookie
      const response = await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // clear local user data on logout (if any)
      localStorage.removeItem("user");
      setUsername(null);
      setShowToast({
        show: true,
        message: "Logged out successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="header">
      <div className="home-section">
        <span className="home-button">
          <FontAwesomeIcon icon={faHouse} />
        </span>
        <span>ScriptFORGE</span>
      </div>

      <nav className="nav">
        <ul className="nav-list">
          {username ? (
            <>
              <li className="welcome-message">Hello, {username}!</li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <div className="auth-section">
              <li>
                <button onClick={() => openModal("login")}>Login</button>
              </li>
              <li>
                <button onClick={() => openModal("register")}>Register</button>
              </li>
            </div>
          )}
          <div className="utility-section">
            <li>
              <button onClick={() => openModal("about")}>About</button>
            </li>
            <li>
              <button onClick={() => openModal("contact")}>Contact Us</button>
            </li>
          </div>
        </ul>
      </nav>

      {showToast.show && (
        <Toast
          message={showToast.message}
          type={showToast.type}
          onClose={() =>
            setShowToast({ show: false, message: "", type: "success" })
          }
        />
      )}

      {activeModal && (
        <Modal title={activeModal} onClose={closeModal}>
          {/* modal content based on activeModal */}
          {activeModal === "login" && (
            <LoginForm
              onSuccess={() => {
                closeModal();
                // refresh user data on login
                const userData = localStorage.getItem("user");
                if (userData) {
                  try {
                    const user = JSON.parse(userData);
                    setUsername(user.username);
                    setShowToast({
                      show: true,
                      message: `Welcome back, ${user.username}!`,
                      type: "success",
                    });
                  } catch (error) {
                    console.error("Error parsing user data:", error);
                  }
                }
              }}
              onClose={closeModal}
            />
          )}
          {activeModal === "register" && (
            <RegisterForm
              onSuccess={() => {
                closeModal();
                openModal("login");
              }}
              onClose={closeModal}
            />
          )}
          {activeModal === "about" && <AboutScriptHero />}
          {activeModal === "contact" && <ContactForm />}
        </Modal>
      )}
    </header>
  );
};

export default Header;

import type React from "react";
import { useState, useEffect } from "react";

// components
import Modal from "./Modal";
import AboutScriptHero from "./ModalComponents/AboutScriptHero";
import RegisterForm from "./ModalComponents/RegisterForm";
import ContactForm from "./ModalComponents/ContactForm";
import LoginForm from "./ModalComponents/LoginForm";
import { toast } from "react-toastify";

// styling
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

type HeaderProps = {
  setCurrentView: (
    view: "displayStaticFrontPage" | "displayEditor" | "displayProfile"
  ) => void;
};

const Header: React.FC<HeaderProps> = ({ setCurrentView }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Check if any user data already exists in localStorage
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
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Clear local user data on logout (if any)
      localStorage.removeItem("user");
      setUsername(null);
      toast.success("Logged out successfully! See you next time!");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleHomeClick = () => {
    setCurrentView("displayStaticFrontPage");
  };

  return (
    <header className="header">
      <div className="home-section">
        <span
          className="home-button"
          onClick={handleHomeClick}
          style={{ cursor: "pointer" }}
        >
          <FontAwesomeIcon icon={faHouse} />
        </span>
        <div
          className="logo"
          onClick={handleHomeClick}
          style={{ cursor: "pointer" }}
        >
          <span>ScriptHERO</span>
        </div>
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

      {activeModal && (
        <Modal title={activeModal} onClose={closeModal}>
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
                    toast.success(
                      `Logged in successfully! Welcome back, ${user.username}!`
                    );
                  } catch (error) {
                    toast.error("Error logging in, please try again.");
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

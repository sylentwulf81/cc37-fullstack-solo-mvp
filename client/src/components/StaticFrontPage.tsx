// StaticFrontPage.tsx
import type React from "react";
import { useState } from "react";

// components
import Modal from "./Modal";
import RegisterForm from "./ModalComponents/RegisterForm";
import LoginForm from "./ModalComponents/LoginForm";

// styling
import "./_root.css"; // global styling sheet

type FrontPageView =
  | "displayStaticFrontPage"
  | "displayEditor"
  | "displayProfile";

type StaticFrontPageProps = {
  setCurrentView: (view: FrontPageView) => void;
};

/* ----- styling ----- */
import "./Header.css"; // component styling for <Header />
import "./_root.css"; // base styling for entire page

const StaticFrontPage: React.FC<StaticFrontPageProps> = ({
  setCurrentView,
}) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleEditorClick = () => {
    setCurrentView("displayEditor");
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setCurrentView("displayEditor");
  };

  const handleRegisterSuccess = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true); // Show login modal after successful registration
  };

  return (
    <div className="front-page-container">
      <div className="hero-section">
        <h1>Craft your story. ScriptHERO does the rest.</h1>
        <p>
          ScriptHERO is the perfect tool to write perfectly formatted,
          Western-style comic book scripts.
        </p>
      </div>
      <h2 className="front-page-subtitle">
        No hassle, nothing to install. Just start writing.
      </h2>
      <div className="get-started-buttons">
        <button className="button-global" onClick={handleEditorClick}>
          <span className="text">Get Started</span>
          <span>Start Writing!</span>
        </button>
      </div>
      <p>
        <img
          src="https://picsum.photos/id/1/800/600"
          alt="placeholder for main page hero image"
        />
      </p>

      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          <LoginForm
            onSuccess={handleLoginSuccess}
            onClose={() => setShowLoginModal(false)}
          />
        </Modal>
      )}

      {showRegisterModal && (
        <Modal onClose={() => setShowRegisterModal(false)}>
          <RegisterForm
            onSuccess={handleRegisterSuccess}
            onClose={() => setShowRegisterModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default StaticFrontPage;

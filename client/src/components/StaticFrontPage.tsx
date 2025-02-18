// StaticFrontPage.tsx
import type React from "react";

// components
import Modal from "./Modal";
import AboutScriptHero from "./ModalComponents/AboutScriptHero";
import RegisterForm from "./ModalComponents/RegisterForm";
import ContactForm from "./ModalComponents/ContactForm";
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
  const handleClick = () => {
    setCurrentView("displayEditor");
  };

  return (
    <div className="front-page-container">
      <h1 className="front-page-title">
        You Craft Your Story. ScriptHero Does The Rest.
      </h1>
      <h2 className="front-page-subtitle">
        ScriptHero is perfect tool to write perfectly formatted, Western-style
        comic books.
      </h2>
      <button className="button-global" onClick={handleClick}>
        <span className="text">Start Writing</span>
        <span>Adventure Start!</span>
      </button>
      <p>
        <img
          src="https://picsum.photos/id/1/800/600"
          alt="placeholder for main page hero image"
        />
      </p>
      <h3 className="front-page-body">Placeholder for REGISTER big button</h3>
    </div>
  );
};

export default StaticFrontPage;

// App.tsx
import { useState } from "react";
import "./App.css";

/* components */
import Header from "./components/Header";
import Editor from "./components/WritingComponents/Editor";
import StaticFrontPage from "./components/StaticFrontPage";
// import Profile from "./components/Profile"; // TODO create profile page with links to issues
// import Modal from './components/Modal' // TODO is this needed?

type FrontPageView =
  | "displayStaticFrontPage"
  | "displayEditor"
  | "displayProfile";

function App() {
  const [currentView, setCurrentView] = useState<FrontPageView>(
    "displayStaticFrontPage"
  );

  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        {currentView === "displayStaticFrontPage" && (
          <StaticFrontPage setCurrentView={setCurrentView} />
        )}
      </div>
      <div>{currentView === "displayEditor" && <Editor />}</div>
    </>
  );
}

export default App;

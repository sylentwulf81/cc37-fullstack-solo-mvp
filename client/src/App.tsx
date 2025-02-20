// App.tsx
import { useState } from "react";
import "./App.css";

/* components */
import Header from "./components/Header";
import Editor from "./components/WritingComponents/Editor";
import StaticFrontPage from "./components/StaticFrontPage";
import ScriptHeader from "./components/WritingComponents/ScriptHeader";

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
        {/* displayes the Script Editor and Script Editor Header on request */}
        {currentView === "displayStaticFrontPage" && (
          <StaticFrontPage setCurrentView={setCurrentView} />
        )}
      </div>
      <div>
        {currentView === "displayEditor" && <ScriptHeader />}
        {currentView === "displayEditor" && <Editor />}
      </div>
    </>
  );
}

export default App;

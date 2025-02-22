// App.tsx
import { useState } from "react";
import "./App.css";

/* components */
import Header from "./components/Header";
import Editor from "./components/WritingComponents/Editor";
import StaticFrontPage from "./components/StaticFrontPage";
import ScriptHeader from "./components/WritingComponents/ScriptHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FrontPageView =
  | "displayStaticFrontPage"
  | "displayEditor"
  | "displayProfile";

function App() {
  const [currentView, setCurrentView] = useState<FrontPageView>(
    "displayStaticFrontPage"
  );

  const notify = () => toast("My first notification!");

  return (
    <>
      <div>
        <Header setCurrentView={setCurrentView} />
      </div>
      <div>
        {/* displays the Script Editor and Script Editor Header on request */}
        {currentView === "displayStaticFrontPage" && (
          <StaticFrontPage setCurrentView={setCurrentView} />
        )}
      </div>
      <div>
        {currentView === "displayEditor" && <ScriptHeader />}
        {currentView === "displayEditor" && <Editor />}
      </div>
      <ToastContainer />
    </>
  );
}

export default App;

import React from "react";
import { useState } from "react";
import ScriptPreview from "./ScriptPreview";

/* styles */
import "./Editor.css";

export default function Header() {
  const [scriptContent, setScriptContent] = useState("Your Epic Tale...");

  return (
    <div className="script-component-container">
      <div className="editor-section">
        <label>Script:</label>
        <textarea
          name="script-editor-textarea"
          onChange={(e) => setScriptContent(e.target.value)}
          rows={40}
          cols={60}
        />
      </div>

      <div className="preview-section">
        <ScriptPreview markdown={scriptContent} />
      </div>
    </div>
  );
}

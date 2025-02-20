import { useState, ChangeEvent, useEffect } from "react";
import ScriptPreview from "./ScriptPreview";

// styles
import "./Editor.css";

/* currently unused - placeholder for adding more specific styling to each page element 
    and tracking page / panel numbers 

type ScriptElement = {
  type: "PAGE" | "PANEL" | "DIALOGUE" | "TEXT";
  content: string;
  number?: number;
  speaker?: string;
};

*/

const STORAGE_KEY = "script_hero_content";

export default function Editor() {
  const [scriptContent, setScriptContent] = useState(() => {
    // Load saved content from localStorage on initial render
    const savedContent = localStorage.getItem(STORAGE_KEY);
    return savedContent || "Your Epic Tale...";
  });

  // Save to localStorage whenever content changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, scriptContent);
  }, [scriptContent]);

  // formats the script content into markdown syntax
  const formatScriptToMarkdown = (scriptText: string): string => {
    if (!scriptText) return "";

    const lines = scriptText.split("\n");
    const formattedLines = lines.map((line) => {
      const trimmedLine = line.trim();

      // formatting for page element
      if (trimmedLine.toUpperCase().startsWith("PAGE ")) {
        // checks for page followed by a number
        const parts = trimmedLine.split(" ");
        if (parts.length >= 2 && !isNaN(Number(parts[1]))) {
          return `<div class="script-page">${trimmedLine.toUpperCase()}</div>`;
        }
      }

      // formatting for panel element
      if (trimmedLine.toUpperCase().startsWith("PANEL ")) {
        const parts = trimmedLine.split(" ");
        if (parts.length >= 2 && !isNaN(Number(parts[1]))) {
          return `<div class="script-panel">${trimmedLine.toUpperCase()}</div>`;
        }
      }

      // formatting for dialogue (words followed by colon are assumed to be character names)
      const colonIndex = trimmedLine.indexOf(":");
      if (colonIndex > 0) {
        const speaker = trimmedLine.substring(0, colonIndex).trim();
        const dialogue = trimmedLine.substring(colonIndex + 1).trim();

        // check if the speaker is a single word (no spaces)
        // TODO fix for two word names ex/ "charlie reeves:"
        if (speaker.indexOf(" ") === -1) {
          const speakerUpper = speaker.toUpperCase();

          // unique formatting for captions and sfx
          if (speakerUpper === "CAPTION" || speakerUpper === "SFX") {
            return `<div class="script-caption">${speakerUpper}: ${dialogue}</div>`;
          }

          // Regular dialogue
          return `<div class="script-dialogue"><span class="script-speaker"> ${speakerUpper}:</span> ${dialogue}</div>`;
        }
      }

      return `<div class="script-text">${line}</div>`;
    });

    return formattedLines.join("\n");
  };

  const handleScriptChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setScriptContent(e.target.value);
  };

  // Get formatted markdown to pass to the preview
  const formattedMarkdown = formatScriptToMarkdown(scriptContent);

  return (
    <div className="script-component-container">
      <div className="editor-section">
        <label>Script:</label>
        <textarea
          name="script-editor-textarea"
          value={scriptContent}
          onChange={handleScriptChange}
          rows={40}
          cols={60}
        />
      </div>

      <div className="preview-section">
        <ScriptPreview markdown={formattedMarkdown} />
      </div>
    </div>
  );
}

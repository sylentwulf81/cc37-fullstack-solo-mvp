import { useState, ChangeEvent } from "react";
import ScriptPreview from "./ScriptPreview";

// styles
import "./Editor.css";

type ScriptElement = {
  // currently unused - placeholder for adding more specific styling to each page element
  type: "PAGE" | "PANEL" | "DIALOGUE" | "TEXT";
  content: string;
  number?: number;
  speaker?: string;
};

export default function Editor() {
  const [scriptContent, setScriptContent] = useState("Your Epic Tale...");

  // lazy formatting

  const indent = ">";
  const indentDeep = ">>";
  const indentDoubleDeep = ">>>";

  const h1 = "#";
  const h2 = "##";
  const h3 = "###";

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
          return `## ${trimmedLine.toUpperCase()}`;
        }
      }

      // formatting for panel element
      if (trimmedLine.toUpperCase().startsWith("PANEL ")) {
        const parts = trimmedLine.split(" ");
        if (parts.length >= 2 && !isNaN(Number(parts[1]))) {
          return `### ${trimmedLine.toUpperCase()}`;
        }
      }

      // formatting for dialogue (words followed by colon are assumed to be character names)
      const colonIndex = trimmedLine.indexOf(":");
      if (colonIndex > 0) {
        const speaker = trimmedLine.substring(0, colonIndex).trim();
        const dialogue = trimmedLine.substring(colonIndex + 1).trim();

        // check if the speaker is a single word (no spaces)
        // todo: fix for two word names ex/ "charlie reeves:"
        if (speaker.indexOf(" ") === -1) {
          const speakerUpper = speaker.toUpperCase();

          // unique formatting for captions and sfx
          if (speakerUpper === "CAPTION" || speakerUpper === "SFX") {
            return `_${speakerUpper}_: ${dialogue}`;
          }

          // Regular dialogue

          let dialogueArray = [
            `<p style="text-align: center;">${speakerUpper}: </p>`,
            `\n`,
            `<p style="text-align: center;"> ${dialogue} </p>`,
          ];

          return dialogueArray.join("");
          // return `>> _${speakerUpper}_: ${dialogue} `;
        }
      }

      return line;
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

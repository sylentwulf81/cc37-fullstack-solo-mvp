/*
Displays the content user types into Editor as they type it, and applies markdown formatting
This component doesn't need to save anything since it's just a preview of the text in Editor.tsx
*/

import { Remarkable } from "remarkable";

const md = new Remarkable({
  html: true, // enables html tags in parser
  breaks: true, // enables \n to be converted to line breaks in parser
});

type ScriptPreviewProps = {
  markdown: string;
};

export default function ScriptPreview({ markdown }: ScriptPreviewProps) {
  const renderedText = md.render(markdown);
  return (
    <div
      className="script-preview-textarea"
      dangerouslySetInnerHTML={{ __html: renderedText }}
    />
  );
}

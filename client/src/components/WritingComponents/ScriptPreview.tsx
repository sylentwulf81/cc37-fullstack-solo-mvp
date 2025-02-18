import { Remarkable } from "remarkable";

const md = new Remarkable();

type ScriptPreviewProps = {
  markdown: string;
};

export default function ScriptPreview({ markdown }: ScriptPreviewProps) {
  const renderedHTML = md.render(markdown);
  return (
    <div
      className="script-preview-textarea"
      dangerouslySetInnerHTML={{ __html: renderedHTML }}
    />
  );
}

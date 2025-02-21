// styling
import "../../../_root.css"; // global styling
import "../../Modal.css"; // global modal styling

export default function FAQ() {
  return (
    <>
      <h1 className="header">How To Use ScriptHERO</h1>

      <h2 className="subheader">Parts of a Script</h2>

      <div className="script-element">
        <strong>Page</strong> | <code>page #</code>
      </div>

      <div className="script-element">
        <strong>Panel</strong> | <code>panel #</code>
      </div>

      <div className="script-element">
        <strong>Dialogue</strong> | <code>charactername:</code>
      </div>

      <div className="script-element">
        <strong>Sound effects</strong> | <code>sfx:</code>
      </div>

      <div className="script-element">
        <strong>Captions</strong> | <code>caption:</code>
      </div>
    </>
  );
}

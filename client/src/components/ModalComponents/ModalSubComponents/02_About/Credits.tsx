// styling

import "../../../_root.css";
import "../../Modal.css";

export default function Credits() {
  return (
    <>
      <div>Site Design: Damien Lavizzo for Maraka, G.K.</div>
      <br />
      <div></div>
      <div className=".modal-title-text">Libraries</div>
      <ul>
        <li>
          <a href="https://github.com/jonschlinkert/remarkable">RemarkableJS</a>{" "}
          by Jon Schlinkert
        </li>
        <span>Used for Markdown parsing in real time.</span>
        <li>
          <a href="https://github.com/parallax/jsPDF">jsPDF</a> by parallax
        </li>
        <span>Used to export formatted scripts as PDF</span>
      </ul>
    </>
  );
}

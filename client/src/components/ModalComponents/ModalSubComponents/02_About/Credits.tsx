// styling

import "../../../_root.css";
import "../../Modal.css";

export default function Credits() {
  return (
    <>
      <div>Site Design: Damien Lavizzo for Maraka, G.K.</div>
      <br />
      <div className=".modal-title-text">Resources</div>
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
        <li>
          SVG Icons courtesy{" "}
          <a href="https://www.flaticon.com/authors/riajulislam">
            Ria Julislam
          </a>{" "}
          on FlatIcon.com
        </li>
      </ul>
    </>
  );
}

/* 
Version information:
Version should use the following numbering convention - MAJOR.MINOR.PATCH.EMERGENCY_PATCH 
Major patches will use alliterative nomenclature ex 1.0 Astral Archer, 2.0 Brave Battlemage, etc. 
Minor patches do not recieve an updated nomenclature
Future versions will display major added features on the version modal 
*/

//styles

import "../../../_root.css";
import "../../Modal.css";

export default function Version() {
  return (
    <>
      <div className="version-info-container">
        <div className="version-info">
          SCRIPTHERO 0.2.0-alpha.1 Astral Archer
        </div>
        <span>23 FEB 2025</span>
        <div className="version-info-subtext">
          <ul>
            <li>Adds new toast notifications to the app</li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="version-info">
        <div>SCRIPTHERO 0.1.0-alpha.1 Astral Archer</div>
        <span>21 FEB 2025</span>
        <div className="version-info-subtext">
          <ul>
            <li>Initial MVP</li>
          </ul>
        </div>
      </div>
      <br />
      <br />
      <div>
        <i>
          "If there is nothing more than what we make in this world,
          brothers...let us make good."
        </i>
        <br />
        <br />
        <span>
          <i>- Beta Ray Bill, 'The Green of Eden' Vol 1</i>
        </span>
      </div>
    </>
  );
}

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
      <div>SCRIPTFORGE 0.1.0-alpha.1 Astral Archer</div>
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

// will display the user's profile and allow them to see / select past projects if logged in

import { useState } from "react";

// styling
import "../_root.css";
import "./UserProfile.css";

export default function UserProfile() {
  return (
    <>
      <h1>User Profile</h1>
      <div>My Projects</div>
      {/* on selecting a project, move user to Editor and populate editor with text and add onSuccess toast with project name */}
    </>
  );
}

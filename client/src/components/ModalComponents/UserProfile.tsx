// will display the user's profile and allow them to see / select past projects if logged in

// styling
import "../_root.css";
import "./UserProfile.css";
import "./Modal.css";

export default function UserProfile() {
  return (
    <>
      <h1 className="user-profile-element user-profile">User Profile</h1>
      <div className="user-profile element my-projects">My Projects:</div>
      {/* on selecting a project, move user to Editor and populate editor with text and add onSuccess toast with project name */}
    </>
  );
}

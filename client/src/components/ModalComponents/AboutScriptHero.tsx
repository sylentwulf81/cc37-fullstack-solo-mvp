import React from "react";

// styles
import "../_root.css";
import "./AboutScriptHero.css";
import "./Modal.css";

const AboutScriptHero: React.FC = () => {
  return (
    <div className="modal-title-text">
      <h2>Welcome to ScriptHero</h2>

      <p className="modal-body-text">
        Unleash your inner storyteller with ScriptHero, the premier web app for
        crafting Western-style comic scripts. Built by writers for writers,
        ScriptHero streamlines the comic scripting process so you can focus on
        what matters most – telling amazing stories.
      </p>

      <p className="modal-body-text">
        Whether you're drafting your first comic or you're a seasoned
        professional, our intuitive tools help you format panels, structure
        scenes, and manage dialogue with ease. Transform your ideas into
        professionally formatted comic scripts ready for artists and publishers.
      </p>

      <p>
        Join a growing community of comic creators and start writing your next
        masterpiece today.
      </p>

      <div className="feature-highlights">
        <ul>
          <li>Professional-grade comic script formatting</li>
          <li>Panel and page management</li>
          <li>Write-anywhere broswer-based editor</li>
          <li>Export-ready documents</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutScriptHero;

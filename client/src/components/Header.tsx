import React from 'react';


// style
import './Header.css';

// component imports
import Modal from './Modal.tsx'

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="title">{title}</h1>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item"><a href="#" className="nav-link">Login</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Home</a></li>
            <li className="nav-item"><a href="#" className="nav-link">About</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

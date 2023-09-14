import React, { useState } from 'react';
import { BrowserRouter as  Link } from 'react-router-dom';
import "./menu.css"

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="menu-container">
      <button onClick={toggleMenu} className="iconmenu bi bi-list"></button>
      {menuOpen && (
        <div className="menu">
          <div className="menu-header">
            <button className="iconexit bi bi-x" onClick={closeMenu}>
            </button>
            <ul>
              <Link to="/Myprofile" className="linkmenu bi bi-person-circle" > My Profile</Link>
              <li className="linkmenu bi bi-table">  Dữ liệu</li>
              <li className="linkmenu bi bi-clock-history">  Lịch sự bật tắt</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;

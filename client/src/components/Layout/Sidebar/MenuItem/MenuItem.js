import React from "react";

const MenuItem = ({ title, icon }) => {
  return (
    <li className="nav-item">
      <a className="nav-link" href="index.html">
        <span className="menu-title">{ title }</span>
        <i className={icon}></i>
      </a>
    </li>
  );
};
export default MenuItem;

import React from "react";
import MenuItem from "./MenuItem/MenuItem";

const Sidebar = ({ children }) => {
  return (
    <div className="container-fluid page-body-wrapper">
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item sidebar-actions">
            <span className="nav-link">
              <div className="border-bottom">
                <h6 className="font-weight-normal mb-3">Vos dossier</h6>
              </div>
            </span>
          </li>
          
          <MenuItem title={"Dashboard"} icon={"mdi mdi-home menu-icon"}/>
          <MenuItem title={"Icons"} icon={"mdi mdi-contacts menu-icon"}/>
          <MenuItem title={"Dashboard"} icon={"mdi mdi-home menu-icon"}/>
         
          <li className="nav-item sidebar-actions">
            <span className="nav-link">
              <button className="btn btn-block btn-lg btn-gradient-primary mt-4">
                + Ajouter dossier
              </button>
            </span>
          </li>
        </ul>
      </nav>

      { children }
    </div>
  );
};
export default Sidebar;

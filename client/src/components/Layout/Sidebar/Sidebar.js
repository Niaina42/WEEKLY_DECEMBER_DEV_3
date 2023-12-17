import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem/MenuItem";
import https from "../../../services/http/https";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../services/context/auth-context";

const Sidebar = ({ children }) => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchFolder = async () => {
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("uid", user.user.id);
      let response = await https.post("/folders/user", formData);
      if (response) {
        setFolders(response.data);
        // navigate(`/home/${response.data[0].id}`)
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFolder();
  }, []);

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
          {
            folders && folders.map((folder, idx) => (
              <MenuItem key={idx} id={folder.id} title={folder.name} />
            ))
          }

          <li className="nav-item sidebar-actions">
            <span className="nav-link">
              <Link to="/folder/add" className="btn btn-block btn-lg btn-gradient-primary mt-4">
                + Ajouter dossier
              </Link>
            </span>
          </li>
        </ul>
      </nav>

      { children }
    </div>
  );
};
export default Sidebar;

import React from "react";
import Layout from "../Layout/Layout";

const Home = () => {
  return (
    <Layout>
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="page-header">
            <h3 class="page-title">
              Dossier name
            </h3>
            <h3 class="page-title">
              <button className="btn btn-block btn-lg btn-gradient-primary">
                + Ajouter des fichier
              </button>
            </h3>
          </div>
          <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Project Status</h4>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th> Id </th>
                          <th> Nom </th>
                          <th> Date creation </th>
                          <th> Action </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td> 1 </td>
                          <td> Herman Beck </td>
                          <td> May 15, 2015 </td>
                          <td>
                            <label class="badge badge-danger">Supprimer</label>
                            <label class="badge badge-success" style={{marginLeft:4}}>Telecharger</label>
                          </td>
                        </tr>
                        <tr>
                          <td> 2 </td>
                          <td> Messsy Adam </td>
                          <td> Jul 01, 2015 </td>
                          <td>
                            <label class="badge badge-danger">Supprimer</label>
                            <label class="badge badge-success" style={{marginLeft:4}}>Telecharger</label>
                          </td>
                        </tr>
                        <tr>
                          <td> 3 </td>
                          <td> John Richards </td>
                          <td> Apr 12, 2015 </td>
                          <td>
                            <label class="badge badge-danger">Supprimer</label>
                            <label class="badge badge-success" style={{marginLeft:4}}>Telecharger</label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

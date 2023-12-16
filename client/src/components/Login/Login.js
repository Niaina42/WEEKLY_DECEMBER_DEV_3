import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth">
          <div className="row flex-grow">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left p-5">
                <div className="brand-logo">
                    <span className="logo-title">My Storage</span> 
                </div>
                <h4>Bonjour, Commençons l'aventure</h4>
                <h6 className="font-weight-light">Connectez-vous pour continuer.</h6>
                <form className="pt-3">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder="Username"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder="Password"
                    />
                  </div>
                  <div className="mt-3">
                    <a
                      className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                      href="../../index.html"
                    >
                      CONNEXION
                    </a>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" /> Restez connecté{" "}
                      </label>
                    </div>
                    <a href="#" className="auth-link text-black">
                        Mot de passe oublié?
                    </a>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    {" "}
                    Vous n'avez pas de compte ?{" "}
                    <Link to="/register" className="text-primary">
                        Créer
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;

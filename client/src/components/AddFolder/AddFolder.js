import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router-dom";
import https from "../../services/http/https";
import { useAuth } from "../../services/context/auth-context";
import { toFormData } from "axios";

const AddFolder = () => {
  const [data, setData] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth()
  const navigation = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(data);
    try {
        setLoading(true);
        let formData = toFormData({ name: data.name, uid: user.user.id });
        let response = await https.post("/folders/add", formData);
        if (response) {
            setLoading(false);
            window.location.href = `/home/${response.data.id}`
        }
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <Layout>
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-md-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Ajouter un dossier</h4>
                  <form class="forms-sample" onSubmit={handleSubmit}>
                    <div class="form-group">
                      <label for="exampleInputName1">Nom</label>
                      <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        class="form-control"
                        id="exampleInputName1"
                      />
                    </div>

                    {loading ? (
                      <button
                        type="submit"
                        disabled
                        class="btn btn-gradient-primary me-2"
                      >
                        Chargement...
                      </button>
                    ) : (
                      <button
                        type="submit"
                        class="btn btn-gradient-primary me-2"
                      >
                        Envoyer
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddFolder;

import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import https from "../../services/http/https";

const AddFile = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { folder_id } = useParams();
  const navigation = useNavigate();
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append("folder_id", folder_id);

    try {
      let response = await https.post("/files/add", formData);
      if (response) {
        setLoading(false);
        navigation(-1);
      }
    } catch (error) {
        setLoading(false);
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
                  <h4 class="card-title">Ajouter des fichier</h4>
                  <form class="forms-sample" onSubmit={handleSubmit}>
                    <div class="form-group">
                      <label for="exampleInputConfirmPassword1">Fichier</label>
                      <input
                        type="file"
                        class="form-control"
                        id="exampleInputConfirmPassword1"
                        onChange={handleFileChange}
                        placeholder="Password"
                      />
                    </div>
                    <div class="form-group">
                      <button class="btn btn-light" onClick={() => navigation(-1) }>+</button>
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

export default AddFile;

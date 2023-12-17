import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import https from "../../services/http/https";

const AddFile = () => {
  const [files, setFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputNumber, setInputNumber] = useState([0]);
  const { folder_id } = useParams();
  const navigation = useNavigate();

  const handleFileChange = (event, index) => {
    let tmpFile = files;
    tmpFile[index] = event.target.files[0];
    setFile(tmpFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (files.length) {
      setLoading(true);
      try {
        for await (let file of files) {
          if (files) {
            const formData = new FormData();

            formData.append("file", file);

            formData.append("folder_id", folder_id);

            await https.post("/files/add", formData);
          }
        }
        setLoading(false);
        navigation(-1);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
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
                    {inputNumber &&
                      inputNumber.map((data, idx) => (
                        <div class="form-group" key={idx}>
                          <label for="exampleInputConfirmPassword1">
                            Fichier 
                          </label>
                          <input
                            type="file"
                            class="form-control"
                            id="exampleInputConfirmPassword1"
                            onChange={(e) => handleFileChange(e, data)}
                            placeholder="Password"
                          />
                        </div>
                      ))}

                    <div class="form-group">
                      <button
                        class="btn btn-light"
                        onClick={() =>
                          setInputNumber((prev) => [
                            ...prev,
                            inputNumber[inputNumber.length - 1] + 1,
                          ])
                        }
                      >
                        +
                      </button>
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

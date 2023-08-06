import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import Moment from "react-moment";
import FirstDocument from "../../components/Modal/ModalFirstDocument";

const VisualizarDoc = () => {
  const [message, setMessage] = useState("");
  const [messageService, setMessageService] = useState("");

  const [data, setData] = useState("");

  const [url, setUrl] = useState({
    name: "",
    documentType: "",
    documentCode: "",
    documentDate: "",
    documentCpf: "",
    documentRg: "",
    image: "",
    createdAt: "",
  });

  const { id } = useParams();
  const [_id] = useState(id);

  useEffect(() => {
    const getDoc = async () => {
      if (_id === undefined) {
        setMessage("Documento não encontrado");
        return;
      }

      await api
        .get(`/visualizar-documento/${id}`)
        .then((response) => {
          setData(response.data.file);
          setUrl(response.data.url);
        })
        .catch((error) => {
          if (error.response) {
            setMessageService(error.response.data.mensagem);
          } else {
            setMessage("Erro no servidor. Tente mais tarde!");
          }
        });
    };
    getDoc();
  });

  return (
    <div className="body">
      <div className="container">
        <h1 className="title-page">INFORMAÇÕES DO DOCUMENTO</h1>

        <div className="border"></div>

        <fieldset>
          <div className="container-basic-1">
            <h2>IDENTIFICAÇÃO DO DOCUMENTO</h2>
            <div className="container-info-1">
              <label>
                Tipo do documento:
                <div>
                  <span>{data.documentType}</span>
                </div>
              </label>

              <label>
                Código do documento:
                <div>
                  <span>{data.documentCode}</span>
                </div>
              </label>
            </div>
          </div>
        </fieldset>

        <fieldset className="fieldset-spaced">
          <div className="container-basic-1">
            <h2>INFORMAÇÕES DA PESSOA</h2>
            <div className="container-info-1">
              <label>
                Nome:
                <div>
                  <span>{data.name}</span>{" "}
                </div>
              </label>

              <label>
                CPF:
                <div>
                  <span>{data.documentCpf}</span>
                </div>
              </label>

              <label>
                RG:
                <div>
                  <span>{data.documentRg}</span>
                </div>
              </label>

              <label>
                Data de nascimento:
                <div>
                  <span>{data.documentDate}</span>
                </div>
              </label>
            </div>
          </div>
        </fieldset>

        <fieldset className="fieldset-spaced">
          <div className="container-basic-1">
            <h2>DOCUMENTO</h2>
            <div className="container-info-1">
              <label>
                Adicionado em:
                <div>
                  <span>
                    <Moment format="DD/MM/YYYY">{data.createdAt}</Moment>
                  </span>
                </div>
              </label>

              <label>
                Visualizar documento:
                <br />
              </label>
              <div className="pdf-styles">
                <embed
                  src={url + data.image}
                  type=""
                  width="50%"
                  height="892"
                />
              </div>
            </div>
          </div>
        </fieldset>

        <div className="custom">
          {messageService ? (
            <button className="message-add">
              <FirstDocument />
              <p>{messageService}</p>
            </button>
          ) : (
            ""
          )}
          {message ? <span className="message-error">{message}</span> : ""}
        </div>
      </div>
    </div>
  );
};
export default VisualizarDoc;

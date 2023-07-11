import React, { useEffect, useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

import styles from "./VizualizarDoc.module.css";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import Moment from "react-moment";
import FirstDocument from "../../components/Modal/ModalFirstDocument";

const VizualizarDoc = () => {
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
        .get(`/vizualizar-documento/${id}`)
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
    <div className={styles.body}>
      <Navbar />
      <div className={styles.arquivo}>
        <Sidebar />
      </div>
      <div className={styles.container}>
        <h1>INFORMAÇÕES DO DOCUMENTO</h1>
        <form className="forms vizibleDocs">
          <div className="containerInputs">
            <div className="formconfig">
              <label>
                Documento:
                <input
                  type="text"
                  name="email"
                  placeholder="Editar E-mail"
                  defaultValue={data.documentType}
                  disabled
                />
              </label>

              <label>
                Código:
                <input
                  type="text"
                  name="email"
                  defaultValue={data.documentCode}
                  disabled
                />
              </label>
            </div>

            <label>
              Nome:
              <input
                type="text"
                name="name"
                placeholder="Editar nome do usuário"
                defaultValue={data.name}
                disabled
              />
            </label>

            <div className="formconfig">
              <label>
                CPF:
                <input
                  type="text"
                  name="email"
                  defaultValue={data.documentCpf}
                  disabled
                />
              </label>

              <label>
                RG:
                <input
                  type="text"
                  name="email"
                  defaultValue={data.documentRg}
                  disabled
                />
              </label>
            </div>

            <div className="formconfig">
              <label>
                Data:
                <div className="formatDate">
                  <Moment format="DD/MM/YYYY">{data.documentDate}</Moment>
                </div>
              </label>

              <label>
                Adicionado em:
                <div className="formatDate">
                  <Moment format="DD/MM/YYYY">{data.createdAt}</Moment>
                </div>
              </label>
            </div>

            <label>
              Click para vizualizar o documento:
              <a className="infoDoc" href={url + data.image} target="blank">
                {data.image}
              </a>
            </label>
          </div>
        </form>
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
export default VizualizarDoc;

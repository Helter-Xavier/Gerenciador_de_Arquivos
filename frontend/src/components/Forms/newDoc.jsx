import React from "react";
import { useState } from "react";
//Mask
import InputMask from "react-input-mask";
import { AiOutlineFileSync } from "react-icons/ai";

//Import Api
import { api } from "../../services/api";

import ClipLoader from "react-spinners/SyncLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "4c91ce",
};

const NewDoc = () => {
  const [documentCode, setDocumentCode] = useState("");
  const [name, setName] = useState("");
  const [documentCpf, setDocumentCpf] = useState("");
  const [documentRg, setDocumentRg] = useState("");
  const [documentDate, setDocumentDate] = useState("");

  const [doc, setDoc] = useState("");

  const [selected, setSelected] = useState("");

  const [message, setMessage] = useState("");
  const [messageFailed, setMessageFailed] = useState("");

  const [confirmTimeout, setConfirmTimeout] = useState(true);
  const [startTimeout, setStartTimeout] = useState(true);

  const [loading, setLoading] = useState(true);

  const [color] = useState("#4c91ce");

  // Upload
  const uploadFile = (e) => {
    e.preventDefault();

    setLoading(!loading);

    const formData = new FormData();

    formData.append("documentType", selected);
    formData.append("documentCode", documentCode);
    formData.append("name", name);
    formData.append("image", doc);
    formData.append("documentCpf", documentCpf);
    formData.append("documentRg", documentRg);
    formData.append("documentDate", documentDate);

    api
      .post("/upload-docs", formData)
      .then((response) => {
        const msgSucess = response.data.mensagem;

        const loadingTimer = setTimeout(() => {
          setConfirmTimeout(false);
          setLoading(loading);
          setMessage(msgSucess);
        }, 2000);

        const reload = setTimeout(() => {
          window.location.reload();

          return () => clearTimeout(reload);
        }, 2500);

        return () => clearTimeout(loadingTimer);
      })
      .catch((err) => {
        const loadingTimer = setTimeout(() => {
          setStartTimeout(false);
          setLoading(loading);
          if (err.response) {
            setMessageFailed(err.response.data.mensagem);
          } else {
            setMessageFailed("Erro: Tente novamente mais tarde!");
          }
        }, 2000);

        const reload = setTimeout(() => {
          window.location.reload();
          // setMessageFailed("");
          return () => clearTimeout(reload);
        }, 4000);

        return () => clearTimeout(loadingTimer);
      });
  };

  return (
    <div>
      <form className="forms" onSubmit={uploadFile}>
        <div className="title-forms">
          <AiOutlineFileSync />
          <h1>Novo Arquivo</h1>
        </div>
        <div className="containerInputs">
          <label>
            Tipo de Documento:
            <select
              value={selected}
              name="documentType"
              placeholder="E-mail"
              className="select"
              onChange={(e) => setSelected(e.target.value)}
              required
            >
              <option value="" disabled={true}>
                Selecione...
              </option>
              <option value="PRONTUARIO" disabled={false}>
                Prontuário
              </option>
              <option value="PROCESSO" disabled={false}>
                Processo
              </option>
            </select>
          </label>

          <label>
            <div className="container-key">
              Código do documento:
              <div className="prioritary-key">* </div>
            </div>
            <input
              type="text"
              name="documentCode"
              placeholder="Código do documento único"
              onChange={(e) => setDocumentCode(e.target.value)}
              required
            />
          </label>

          <label>
            Nome:
            <input
              type="text"
              name="name"
              placeholder="Nome Completo"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            CPF:
            <InputMask
              mask="999.999.999-99"
              type="text"
              name="documentCpf"
              placeholder="CPF"
              onChange={(e) => setDocumentCpf(e.target.value)}
              required
            />
          </label>

          <label>
            RG:
            <InputMask
              mask="99.999.999-9"
              type="text"
              name="documentRg"
              placeholder="RG"
              onChange={(e) => setDocumentRg(e.target.value)}
              required
            />
          </label>

          <label>
            Data:
            <input
              type="date"
              name="documentDate"
              id="documentDate"
              onChange={(e) => setDocumentDate(e.target.value)}
              required
            />
          </label>

          <label>
            <input
              type="file"
              name="image"
              onChange={(e) => setDoc(e.target.files[0])}
              required
            />
          </label>
        </div>
        <button type="submit" className="btnCadastrar" value="Acessar">
          Salvar
        </button>
      </form>

      {!loading ? (
        <div className="loaderForms">
          <ClipLoader
            className="cliploader"
            color={color}
            loading={!loading}
            cssOverride={override}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        ""
      )}

      {!confirmTimeout ? (
        <span className="message-success">{message}</span>
      ) : (
        ""
      )}
      {!startTimeout ? (
        <span className="message-error-newdocs">{messageFailed}</span>
      ) : (
        ""
      )}

      {/* {!confirmTimeout && <span className="message-success">{message}</span>}
      {!startTimeout && (
        <span className="message-error-newdocs">{messageFailed}</span>
      )} */}
    </div>
  );
};

export default NewDoc;

import React from "react";
import { useState } from "react";
//Mask
import InputMask from "react-input-mask";
//Import Api
import { api } from "../../services/api";

import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "4c91ce",
};

const NewProntuario = () => {
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

  const uploadFile = async (e) => {
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

    await api
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
          return () => clearTimeout(reload);
        }, 3000);

        return () => clearTimeout(loadingTimer);
      });
  };

  return (
    <div>
      <form className="forms" onSubmit={uploadFile}>
        <h1>Novo Prontuário</h1>
        <div className="containerInputs">
          <label>
            Tipo de Documento:
            <select
              value={selected}
              required
              name="documentType"
              placeholder="E-mail"
              className="select"
              onChange={(e) => setSelected(e.target.value)}
            >
              <option value="" disabled={true}>
                Selecione...
              </option>
              <option value="prontuario" disabled={false}>
                Prontuário
              </option>
              <option value="documentA" disabled={true}>
                Documento A
              </option>
              <option value="documentB" disabled={true}>
                Documento B
              </option>
              <option value="documentC" disabled={true}>
                Documento C
              </option>
            </select>
          </label>

          <label>
            Código do documento:
            <input
              type="text"
              name="documentCode"
              placeholder="Código do Documento"
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

        {!loading ? (
          <div className="loaderForms">
            <ClipLoader
              className="cliploader"
              color={color}
              loading={!loading}
              cssOverride={override}
              size={40}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          ""
        )}
        {!confirmTimeout && <span className="message-success">{message}</span>}
        {!startTimeout && (
          <span className="message-error-newdocs">{messageFailed}</span>
        )}
      </form>
    </div>
  );
};

export default NewProntuario;

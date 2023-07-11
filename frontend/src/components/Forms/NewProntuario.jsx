import React from "react";
import { useState } from "react";
//Mask
import InputMask from "react-input-mask";
//Import Api
import { api } from "../../services/api";

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

  const uploadFile = async (e) => {
    e.preventDefault();

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

        setConfirmTimeout(false);
        setMessageFailed(msgSucess);
        window.location.reload();

        const msgTimer = setTimeout(() => {
          window.location.reload();
        }, 1000);
        return () => clearTimeout(msgTimer);
      })
      .catch((error) => {
        const msg = error.response.data.mensagem;

        const msgTimer = setStartTimeout(false);
        setMessage(msg);

        setTimeout(() => {
          window.location.reload();
        }, 1500);
        return () => clearTimeout(msgTimer);
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
        {!startTimeout && <span className="message-error">{message}</span>}
        {!confirmTimeout && (
          <span className="message-success">{messageFailed}</span>
        )}
      </form>
    </div>
  );
};

export default NewProntuario;

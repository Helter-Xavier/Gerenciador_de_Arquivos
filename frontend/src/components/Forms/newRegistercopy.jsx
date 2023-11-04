import React from "react";

import { useState } from "react";
import InputMask from "react-input-mask";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { cpf, cnpj } from "cpf-cnpj-validator";

import { AiOutlineFileSync } from "react-icons/ai";
import { api } from "../../services/api";

const schema = yup
  .object({
    documentType: yup.string().required("Escolha o tipo do documento"),
    documentCode: yup.string().required("Digite o código do documento"),
    name: yup.string().required("Digite o nome completo"),
    documentCpf: yup
      .string()
      .required()
      .test((value) => cnpj.isValid(value) || cpf.isValid(value)),
    documentRg: yup.string().required("Digite o número de RG"),
    documentDate: yup.string().required("Digite a data do documento"),
    image: yup.string().required("Escolha um arquivo"),
  })
  .required();

const NewRegistercopy = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const [doc, setDoc] = useState("");

  const [selected, setSelected] = useState("");

  //Envio de dados para o banco
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("data", data);
    console.log(formData);

    await api
      .post("/upload-docs", formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Select
  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <div>
      <form className="forms" onSubmit={handleSubmit(onSubmit)}>
        <div className="title-forms">
          <AiOutlineFileSync />
          <h1>Novo Arquivo</h1>
        </div>
        <div className="containerInputs">
          <label>
            Permissão de acesso:
            <select
              value={selected}
              {...register("documentType", { required: true })}
              className="select"
              name="documentType"
              onChange={handleChange}
            >
              <option value="" disabled={true}>
                Selecione...
              </option>
              <option value="prontuario" disabled={false}>
                Prontuário
              </option>
              <option value="processo" disabled={false}>
                Processo
              </option>
            </select>
            {errors.documentType && (
              <span className="errors-req">Escolha o tipo do documento</span>
            )}
          </label>

          <label>
            Código do Documento:
            <input
              type="text"
              name="documentCode"
              placeholder="Nome Completo"
              {...register("documentCode", { required: true })}
            />
            {errors.documentCode && (
              <span className="errors-req">Digite o código do documento</span>
            )}
          </label>

          <label>
            Nome:
            <input
              type="text"
              name="name"
              placeholder="Nome Completo"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="errors-req">Digite o nome completo</span>
            )}
          </label>

          <label>
            CPF:
            <InputMask
              mask="999.999.999-99"
              type="text"
              name="documentCpf"
              placeholder="CPF"
              {...register("documentCpf", { required: true })}
            />
            {errors.documentCpf && (
              <span className="errors-req">Digite um CPF válido</span>
            )}
          </label>

          <label>
            RG:
            <InputMask
              mask="99.999.999-9"
              type="text"
              name="documentRg"
              placeholder="RG"
              {...register("documentRg", { required: true })}
            />
            {errors.documentRg && (
              <span className="errors-req">Digite o número de RG</span>
            )}
          </label>

          <label>
            Data:
            <input
              type="date"
              name="documentDate"
              {...register("documentDate", { required: true })}
            />
            {errors.documentDate && (
              <span className="errors-req">Digite a data do documento</span>
            )}
          </label>

          <label>
            Upload:
            <input
              type="file"
              name="image"
              onChange={(e) => setDoc(e.target.files[0])}
              {...register("image", { required: true })}
            />
            {errors.image && (
              <span className="errors-req">Escolha um arquivo</span>
            )}
          </label>
        </div>
        <button type="submit" className="btnCadastrar" value="Acessar">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default NewRegistercopy;

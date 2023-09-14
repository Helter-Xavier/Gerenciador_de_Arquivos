import React from "react";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../../services/api";

import ClipLoader from "react-spinners/SyncLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "4c91ce",
};

const schema = yup
  .object({
    name: yup.string().required("Esse campo é obrigatório"),
    email: yup
      .string()
      .email("Digite um email válido")
      .required("O email é obrigatório"),
    permissions: yup.string().required("Esse campo é obrigatório"),
    password: yup
      .string()
      .min(6, "A senha deve ter pelo menos 6 digitos")
      .required("A senha é obrigatório"),
    confirmPassword: yup
      .string()
      .required("Por favor, digite a mesma senha")
      .oneOf([yup.ref("password")], "A senha deve ser a mesma"),
  })
  .required();

const NewRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [message, setMessage] = useState("");
  const [messageFailed, setMessageFailed] = useState("");

  const [confirmTimeout, setConfirmTimeout] = useState(true);
  const [startTimeout, setStartTimeout] = useState(true);

  const [loading, setLoading] = useState(true);

  const [color] = useState("#4c91ce");

  const [selected, setSelected] = useState("");

  //Envio de dados para o banco
  const onSubmit = async (data) => {
    // console.log(data);
    setLoading(!loading);
    await api
      .post("/register", data)
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

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <div>
      <form className="forms" onSubmit={handleSubmit(onSubmit)}>
        <h1>Criar cadastro</h1>
        <div className="containerInputs">
          <label>
            Nome:
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nome Completo"
              {...register("name", { required: true })}
            />
            <span className="errors-req">{errors.name?.message}</span>
          </label>

          <label>
            E-mail:
            <input
              type="text"
              name="email"
              placeholder="E-mail"
              {...register("email", { required: true })}
            />
            <span className="errors-req">{errors.email?.message}</span>
          </label>

          {/* Permissão de acesso */}
          <label>
            Permissão de acesso:
            <select
              value={selected}
              {...register("permissions")}
              placeholder="E-mail"
              className="select"
              onChange={handleChange}
            >
              <option value="" disabled={true}>
                Selecione...
              </option>
              <option value="ADMINISTRADOR" disabled={false}>
                Administrador
              </option>
              <option value="SUPERVISOR" disabled={false}>
                Supervisor
              </option>
              <option value="USUARIO COMUM" disabled={false}>
                Usuário Comum
              </option>
            </select>
            <span className="errors-req">{errors.permissions?.message}</span>
          </label>

          <label>
            Senha:
            <input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              {...register("password", { required: true })}
            />
            <span className="errors-req">{errors.password?.message}</span>
          </label>

          <label>
            Confirmar Senha:
            <input
              type="password"
              name="confirmPassword"
              placeholder="Digite sua senha novamente"
              {...register("confirmPassword", { required: true })}
            />
            <span className="errors-req">
              {errors.confirmPassword?.message}
            </span>
          </label>
        </div>
        <button type="submit" className="btnCadastrar" value="Acessar">
          Cadastrar
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
      {!confirmTimeout && <span className="message-success">{message}</span>}
      {!startTimeout && (
        <span className="message-error-newdocs">{messageFailed}</span>
      )}
    </div>
  );
};

export default NewRegister;

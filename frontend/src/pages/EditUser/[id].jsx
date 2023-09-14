import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// import { useNavigate } from "react-router-dom";

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

const EditUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(true);
  const [color] = useState("#4c91ce");

  const [messageFailed, setMessageFailed] = useState("");

  const [message, setMessage] = useState("");
  const [confirmTimeout, setConfirmTimeout] = useState(true);
  const [startTimeout, setStartTimeout] = useState(true);

  const [data, setData] = useState({
    name: "",
    email: "",
    permissions: "",
    password: "",
  });

  //Navegação entre paginas
  // const navigation = useNavigate();

  //Armazenando Id em uma constante
  const { id } = useParams();
  const [_id] = useState(id);

  //Puxando dados do usuário selecionado pelo ID
  useEffect(() => {
    //Usando ID enviado da tabela
    const getUser = async () => {
      if (_id === undefined) {
        setMessage("Erro: Usuário não encontrado");
        return;
      }

      await api
        .get(`/visualizar-usuario/${_id}`)
        .then((response) => {
          setData(response.data.user);
        })
        .catch((error) => {
          if (error.response) {
            setMessage(error.response.data.mensagem);
          } else {
            setMessage("Erro no servidor. Tente mais tarde!");
          }
        });
    };
    getUser();
  });

  //Atualizando cadastro do usuário
  const handleEdit = (data) => {
    setLoading(!loading);

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .put(`http://localhost:8080/edit-user/${_id}`, data, headers)
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
    <div className="body">
      <div className="container">
        <h1 className="title-page">ATUALIZAR USUÁRIO</h1>

        <div className="border"></div>

        <form onSubmit={handleSubmit(handleEdit)}>
          <fieldset>
            <div className="container-basic-1">
              <h2>ATUALIZAR NOME</h2>
              <div className="container-info-1">
                <label>
                  Nome:
                  <div>
                    <input
                      className="data-inputs"
                      type="text"
                      name="name"
                      defaultValue={data.name}
                      {...register("name", { required: true })}
                    />
                    <span className="errors-req">{errors.name?.message}</span>
                  </div>
                </label>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <div className="container-basic-1">
              <h2>ATUALIZAR E-MAIL</h2>
              <div className="container-info-1">
                <label>
                  E-mail:
                  <div>
                    <input
                      className="data-inputs"
                      type="text"
                      name="email"
                      defaultValue={data.email}
                      {...register("email", { required: true })}
                    />
                    <span className="errors-req">{errors.email?.message}</span>
                  </div>
                </label>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <div className="container-basic-1">
              <div>
                <h2>
                  ATUALIZAR PERMISSÃO DE ACESSO: <b>{data.permissions}</b>
                </h2>
              </div>
              <div className="container-info-1">
                <label>
                  Permissão:
                  <div>
                    <select
                      className="data-inputs"
                      name="permissions"
                      defaultValue={data.permissions}
                      {...register("permissions")}
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

                    <span className="errors-req">
                      {errors.permissions?.message}
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <div className="container-basic-1">
              <h2>ATUALIZAR SENHA</h2>
              <div className="container-info-1">
                <label>
                  Senha:
                  <div>
                    <input
                      className="data-inputs"
                      type="password"
                      name="password"
                      placeholder="Digite sua senha"
                      {...register("password", { required: true })}
                    />
                    <span className="errors-req">
                      {errors.password?.message}
                    </span>
                  </div>
                </label>
              </div>

              <div className="container-info-1">
                <label>
                  Confirmar Senha:
                  <div>
                    <input
                      className="data-inputs"
                      type="password"
                      name="confirmPassword"
                      placeholder="Digite sua senha novamente"
                      {...register("confirmPassword", { required: true })}
                    />
                    <span className="errors-req">
                      {errors.confirmPassword?.message}
                    </span>
                  </div>
                </label>
              </div>
            </div>
            <div className="btn-atualizar">
              <button type="submit" className="btn-atualizar" value="Acessar">
                Atualizar dados
              </button>
            </div>

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
          </fieldset>
        </form>
        {!confirmTimeout && <span className="message-success">{message}</span>}
        {!startTimeout && (
          <span className="message-error-newdocs">{messageFailed}</span>
        )}
      </div>
    </div>
  );
};

export default EditUser;

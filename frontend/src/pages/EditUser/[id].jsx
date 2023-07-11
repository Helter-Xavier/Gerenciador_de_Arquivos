import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

import styles from "./EditUser.module.css";

import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

import ClipLoader from "react-spinners/ClipLoader";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { api } from "../../services/api";

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
  const [messageSuccess, setMessageSuccess] = useState("");
  const [messageError, setMessageError] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    permissions: "",
    password: "",
  });

  const [isShown, setIsSHown] = useState(false);

  //Navegação entre paginas
  const navigation = useNavigate();

  //Armazenando Id em uma constante
  const { id } = useParams();
  const [_id] = useState(id);

  //Puxando dados do usuário selecionado pelo ID
  useEffect(() => {
    //Usando ID enviado da tabela
    const getUser = async () => {
      if (_id === undefined) {
        setMessageSuccess("Erro: Usuário não encontrado");
        return;
      }

      await api
        .get(`/vizualizar-usuario/${_id}`)
        .then((response) => {
          setData(response.data.user);
        })
        .catch((error) => {
          if (error.response) {
            setMessageError(error.response.data.mensagem);
            // navigation("/")
          } else {
            setMessageError("Erro no servidor. Tente mais tarde!");
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
        const msgTimer = setTimeout(() => {
          setLoading(loading);
          setMessageSuccess(response.data.mensagem);
        }, 1000);

        setTimeout(() => {
          navigation("/users-list");
        }, 2500);

        return () => clearTimeout(msgTimer);
      })
      .catch((error) => {
        setMessageError(error.response.data.mensagem);
      });
  };

  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  };

  return (
    <div className={styles.body}>
      <Navbar />
      <div className={styles.home}>
        <Sidebar />
      </div>
      <div className={styles.container}>
        <form className="forms" onSubmit={handleSubmit(handleEdit)}>
          <div className="topfild">
            <h1>Editar Usuário</h1>
            <button className="backtoList">
              <NavLink to="/users-list">
                <BiArrowBack />
              </NavLink>
            </button>
          </div>
          <div className="containerInputs">
            <label>
              Nome:
              <input
                type="text"
                name="name"
                placeholder="Editar nome do usuário"
                defaultValue={data.name}
                {...register("name", { required: true })}
              />
              <span>{errors.name?.message}</span>
            </label>

            <label>
              E-mail:
              <input
                type="text"
                name="email"
                placeholder="Editar E-mail"
                defaultValue={data.email}
                {...register("email", { required: true })}
              />
              <span>{errors.email?.message}</span>
            </label>

            <label>
              Permissão de Acesso:
              <select
                name="permissions"
                defaultValue={data.permissions}
                className="select"
                {...register("permissions")}
              >
                <option value="" disabled={true}>
                  Selecione...
                </option>
                <option value="Administrador" disabled={false}>
                  Administrador
                </option>
                <option value="Gerente" disabled={false}>
                  Gerente
                </option>
                <option value="juridico" disabled={false}>
                  Jurídico
                </option>
                <option value="RH" disabled={false}>
                  Recursos Humanos
                </option>
                <option value="IPML" disabled={false}>
                  Instituto de Previdência Municipal de Limeira
                </option>
              </select>
              <span>{errors.permissions?.message}</span>
            </label>

            <label>
              Senha:
              <input
                type={isShown ? "text" : "password"}
                name="password"
                placeholder="Senha"
                {...register("password", { required: true })}
              />
              <span>{errors.password?.message}</span>
            </label>

            <div
              className="checkbox-container formEditUser"
              checked={isShown}
              onClick={togglePassword}
            >
              {isShown ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
            </div>

            <label>
              Confirmar Senha:
              <input
                type={isShown ? "text" : "password"}
                name="confirmPassword"
                placeholder="Digite a senha novamente"
                {...register("confirmPassword", { required: true })}
              />
              <span>{errors.confirmPassword?.message}</span>
            </label>

            <div
              className="checkbox-container formEditUser"
              checked={isShown}
              onClick={togglePassword}
            >
              {isShown ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
            </div>
          </div>
          <button type="submit" className="btnCadastrar" value="Acessar">
            Editar
          </button>
          {messageSuccess ? (
            <span className="message-success">{messageSuccess}</span>
          ) : (
            ""
          )}
          {messageError ? (
            <span className="message-error">{messageError}</span>
          ) : (
            ""
          )}
        </form>

        <ClipLoader
          color={color}
          loading={!loading}
          cssOverride={override}
          size={40}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default EditUser;

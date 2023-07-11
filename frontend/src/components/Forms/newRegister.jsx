import React from "react";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { api } from "../../services/api";

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
  const [message, setMessage] = useState("");
  const [startTimeout, setStartTimeout] = useState(true);

  const [selected, setSelected] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isShown, setIsSHown] = useState(false);

  //Envio de dados para o banco
  const onSubmit = async (data) => {
    console.log(data);

    await api
      .post("/register", data)
      .then((response) => {
        //Send Message
        const msg = response.data.mensagem;
        //Timer show message
        const msgTimer = setTimeout(() => {
          setStartTimeout(false);
          setMessage(msg);
          window.location.reload();
        }, 500);
        return () => clearTimeout(msgTimer);
      })
      .catch((erro) => {
        console.log(erro + "erro");
      });
  };

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
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
            <span>{errors.name?.message}</span>
          </label>

          <label>
            E-mail:
            <input
              type="text"
              name="email"
              placeholder="E-mail"
              {...register("email", { required: true })}
            />
            <span>{errors.email?.message}</span>
          </label>

          {/* Role e permissão */}
          <label>
            Permissão de Acesso:
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
              <option value="Administrador" disabled={false}>
                Administrador
              </option>
              <option value="Gerente" disabled={false}>
                Gerente
              </option>
              <option value="Juridico" disabled={false}>
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
            className="checkbox-container formRegister"
            checked={isShown}
            onClick={togglePassword}
          >
            {isShown ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
          </div>

          <label className="labelConfirmSenha">
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
            className="checkbox-container formRegister"
            checked={isShown}
            onClick={togglePassword}
          >
            {isShown ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
          </div>
        </div>
        <button type="submit" className="btnCadastrar" value="Acessar">
          Cadastrar
        </button>
      </form>
      {!startTimeout && <span className="message-success">{message}</span>}
    </div>
  );
};

export default NewRegister;

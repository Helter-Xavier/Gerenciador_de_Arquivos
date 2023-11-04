import React from "react";
import brasao from "../../assets/error401.svg";
import { NavLink } from "react-router-dom";

const NotAuthorization = () => {
  return (
    <div className="notAuth">
      <img className="brasao" src={brasao} alt="Foto de Perfil" width={800} />
      <NavLink to="/">
        <button className="btnCadastrar">Voltar</button>
      </NavLink>
      <a href="https://storyset.com/web">Web illustrations by Storyset</a>
    </div>
  );
};

export default NotAuthorization;

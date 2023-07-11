import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

//Import Icons
import { FaHome } from "react-icons/fa";
import { AiFillFilePpt } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";

import brasao from "../../assets/brasao-Prefeitura.png";

function Sidebar() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setProfile(user);
  }, []);

  return (
    <div className={styles.sidebar}>
      <div className={styles.container}>
        <NavLink to="/">
          <img src={brasao} alt="Foto de Perfil" width={40} />
        </NavLink>
      </div>
      <NavLink to="/" className={styles.userName}>
        <h1>{profile.name}</h1>
        <p>{profile.permissions}</p>
      </NavLink>

      {profile.permissions === "Administrador" ||
      profile.permissions === "Gerente" ? (
        <>
          <nav>
            <NavLink to="/">
              <FaHome />
              <h1>Início</h1>
            </NavLink>

            <NavLink to="/users-list">
              <AiOutlineUser />
              <h1>Lista de Usuários</h1>
            </NavLink>

            <NavLink to="/prontuarios">
              <AiFillFilePpt />
              <h1>Prontuários</h1>
            </NavLink>

            <NavLink to="/documentA">
              <AiFillFilePpt />
              <h1>Documento A</h1>
            </NavLink>
          </nav>
        </>
      ) : (
        <>
          <nav>
            <NavLink to="/">
              <FaHome />
              <h1>Início</h1>
            </NavLink>

            <NavLink to="/prontuarios">
              <AiFillFilePpt />
              <h1>Prontuários</h1>
            </NavLink>

            <NavLink to="/documentA">
              <AiFillFilePpt />
              <h1>Documento A</h1>
            </NavLink>
          </nav>
        </>
      )}
      {/* 

        <NavLink to="/arquivos">
          <AiFillFilePdf />
          <h1>Ducumento B</h1>
        </NavLink>

        <NavLink to="/arquivos">
          <AiFillFilePdf />
          <h1>Ducumento C</h1>
        </NavLink> */}
    </div>
  );
}

export default Sidebar;

import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

//Import Icons
import { FaHome } from "react-icons/fa";
import { AiFillFilePpt } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";

import brasao from "../../assets/brasao-Prefeitura.png";

import { AuthContext } from "../../contexts/auth";

import { BsPersonFillGear } from "react-icons/bs";

import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "4c91ce",
};

function Sidebar() {
  const [profile, setProfile] = useState({});

  const { logout } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  const [color] = useState("#4c91ce");

  const handleLogout = () => {
    setLoading(!loading);

    const logoutTimer = setTimeout(() => {
      setLoading(loading);
      logout();
    }, 2000);

    return () => clearTimeout(logoutTimer);
  };

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
      <NavLink to={`/perfil/${profile.id}`} className={styles.userName}>
        <h1>{profile.name}</h1>
        <div className="stylesProfile">
          <p>{profile.permissions}</p>
          <BsPersonFillGear />
        </div>
      </NavLink>

      {profile.permissions === "ADMINISTRADOR" ||
      profile.permissions === "SUPERVISOR" ? (
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

            <NavLink onClick={handleLogout}>
              <BiLogOut />
              <h1>Sair</h1>
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

            <NavLink onClick={handleLogout}>
              <BiLogOut />
              <h1>Sair</h1>
            </NavLink>
          </nav>
        </>
      )}
      {!loading ? (
        <div className="loaderLogout">
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
    </div>
  );
}

export default Sidebar;

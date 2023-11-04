import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

//Import Icons
import { AiOutlineHome } from "react-icons/ai";
import { FiUser, FiUsers } from "react-icons/fi";
import { BsFiles } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";

import brasao from "../../assets/brasao-Prefeitura.png";
import ClipLoader from "react-spinners/SyncLoader";

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
    <div className="sidebar">
      <header>
        <NavLink to={`/perfil/${profile.id}`} className="userName">
          <h1>{profile.name}</h1>
          <div className="stylesProfile">
            <p>{profile.permissions}</p>
          </div>
        </NavLink>
        <nav>
          <NavLink to="/">
            <img
              className="brasao"
              src={brasao}
              alt="Foto de Perfil"
              width={40}
            />
            <h1>Prefeitura de Limeira</h1>
          </NavLink>
          <NavLink to={`/perfil/${profile.id}`}>
            <FiUser />
            <h1>Perfil</h1>
          </NavLink>

          <NavLink to="/">
            <AiOutlineHome />
            <h1>Início</h1>
          </NavLink>
          {profile.permissions === "administrador" && (
            <NavLink to="/users-list-system" className="edit-svg">
              <FiUsers />
              <h1>Lista de Usuários</h1>
            </NavLink>
          )}
          <NavLink to="/list-prontuarios-pdf">
            <BsFiles />
            <h1>Prontuários</h1>
          </NavLink>
          <NavLink to="/docs-process-pdf">
            <BsFiles />
            <h1>Processos</h1>
          </NavLink>
          <NavLink onClick={handleLogout}>
            <BiLogOut />
            <h1>Sair</h1>
          </NavLink>

          <br />
          <br />
        </nav>
      </header>

      {!loading ? (
        <div className="loaderLogout">
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
    </div>
  );
}

export default Sidebar;

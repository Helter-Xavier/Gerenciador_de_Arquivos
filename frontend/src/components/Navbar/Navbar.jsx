//Context
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../contexts/auth";
//Hook router
import { NavLink } from "react-router-dom";
//Import img
import { AiOutlineLogout } from "react-icons/ai";
//CSS

import styles from "./Navbar.module.css";

import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "4c91ce",
};

const Navbar = () => {
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

  const dropDownRef = useRef(null);

  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  return (
    <div>
      <div className={styles.menuContainer}>
        <div className={styles.menuLogo}></div>
        <div className={styles.dropwdown}>
          <button onClick={onClick} className={styles.menuDropdown}>
            <AiOutlineLogout />
          </button>
          <div className="container">
            <nav
              ref={dropDownRef}
              className={`menu ${isActive ? "active" : "inactive"}`}
            >
              <ul>
                <li className={styles.listLi}>
                  <NavLink onClick={handleLogout}>Sair</NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {!loading ? (
        <div className="loader">
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
};

export default Navbar;

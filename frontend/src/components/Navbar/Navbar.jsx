//Context
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../contexts/auth";
//Hook router
import { NavLink } from "react-router-dom";
//Import img
import { AiOutlineLogout } from "react-icons/ai";
//CSS
import styles from "./Navbar.module.css";
import "./Navbar.css";

const Navbar = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
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
    </div>
  );
};

export default Navbar;

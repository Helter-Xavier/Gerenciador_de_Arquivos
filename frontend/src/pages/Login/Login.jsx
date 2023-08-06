// Imports
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import brasao from "../../assets/brasao.png";
import styles from "./Login.module.css";

// import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "4c91ce",
};

const Login = () => {
  // Resgatadno autenticação e login do AuthContext
  const { login } = useContext(AuthContext);

  // Manipulando os states de email e senha
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [startTimeout, setStartTimeout] = useState(true);

  const [loading, setLoading] = useState(true);

  const [color] = useState("#4c91ce");

  const [isShown, setIsSHown] = useState(false);

  //Submit do login para entrar no sistema
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(!loading);
    //Integração com o contexto e API
    login(email, password)
      .then(() => {
        const timelogin = setTimeout(() => {
          setLoading(loading);
        }, 3000);
        return () => clearTimeout(timelogin);
      })
      .catch((error) => {
        const msg = error.response.data;
        const msgTimer = setTimeout(() => {
          setStartTimeout(false);
          setMessage(msg);
          setLoading(loading);
        }, 2000);

        const closeMessage = setTimeout(() => {
          window.location.reload();

          return () => clearTimeout(closeMessage);
        }, 2500);

        return () => clearTimeout(msgTimer);
      });
  };

  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  };

  return (
    // Tela de login
    <div className={styles.logonFormWrap}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.logoTitle}>
          <img src={brasao} alt="imagem-logo" />
          <h1>PREFEITURA MUNICIPAL DE LIMEIRA</h1>
        </div>
        <div className={styles.inputs}>
          <label>
            Usuário:
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Senha:
            <input
              type={isShown ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Senha"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <div
            className="checkbox-container"
            checked={isShown}
            onClick={togglePassword}
          >
            {isShown ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
          </div>
        </div>

        <button type="submit" className={styles.btnLogin} value="Acessar">
          Acessar
        </button>
      </form>

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

      {!startTimeout && (
        <span className="message-error">{message.mensagem}</span>
      )}
    </div>
  );
};

export default Login;

import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

import styles from "./Prontuarios.module.css";

import TableProntuarios from "../../components/Tables/TableProntuarios/TableProntuarios";

const Prontuarios = () => {
  return (
    <div className={styles.body}>
      <Navbar />
      <div className={styles.pastas}>
        <Sidebar />
      </div>
      <div className={styles.container}>
        <TableProntuarios />
      </div>
    </div>
  );
};

export default Prontuarios;

import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

import styles from "./Arquivos.module.css";

import TableDocs from "../../components/Tables/Tabledocs/TableDocs";

const Arquivos = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.arquivo}>
        <Sidebar />
        <div className={styles.container}>
          <TableDocs />
        </div>
      </div>
    </div>
  );
};

export default Arquivos;

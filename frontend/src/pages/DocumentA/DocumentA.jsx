import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

import styles from "./DocumentA.module.css";

import TableDocumentA from "../../components/Tables/TableDocumentA/TableDocumentA";

const DocumentA = () => {
  return (
    <div className={styles.body}>
      <Navbar />
      <div className={styles.pastas}>
        <Sidebar />
      </div>
      <div className={styles.container}>
        <TableDocumentA />
      </div>
    </div>
  );
};

export default DocumentA;

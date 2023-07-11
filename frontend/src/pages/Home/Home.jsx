import styles from "./Home.module.css";

//icons
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import TableDocs from "../../components/Tables/Tabledocs/TableDocs";

const Home = () => {
  return (
    <div className={styles.body}>
      <Navbar />
      <div className={styles.home}>
        <Sidebar />
      </div>
      <div className={styles.container}>
        <TableDocs />
      </div>
    </div>
  );
};

export default Home;

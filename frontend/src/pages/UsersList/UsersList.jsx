import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./UsersList.module.css";
import TablesUsers from "../../components/Tables/TableUsers/TablesUsers";

import NotAuthorization from "./NotAuthorization";

const UsersList = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setProfile(user);
  }, []);

  return (
    <div className={styles.body}>
      <Navbar />
      <div className={styles.users}>
        <Sidebar />
      </div>
      <div className={styles.container}>
        {profile.permissions === "Administrador" && <TablesUsers />}
        {profile.permissions === "Gerente" && <TablesUsers />}
        {profile.permissions === "RH" && <NotAuthorization />}
        {profile.permissions === "Juridico" && <NotAuthorization />}
        {profile.permissions === "IPML" && <NotAuthorization />}
      </div>
    </div>
  );
};

export default UsersList;

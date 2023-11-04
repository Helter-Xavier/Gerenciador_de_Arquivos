import React, { useEffect, useState } from "react";

import TablesUsers from "../../components/Tables/TableUsers/TablesUsers";

import NotAuthorization from "./NotAuthorization";

const UsersList = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setProfile(user);
  }, []);

  return (
    <div className="body">
      <div className="home"></div>
      <div className="container">
        {profile.permissions === "administrador" && <TablesUsers />}
        {profile.permissions === "supervisor" && <NotAuthorization />}
        {profile.permissions === "usuario comum" && <NotAuthorization />}
      </div>
    </div>
  );
};

export default UsersList;

import React from "react";

import { useUserContext } from "@/context/UserContext";
import CollaboratorsPage from "./screens/CollaboratorSection";
import UserSettings from "./screens/UserSettings";
import Dashboard from "./screens/Dashboard";

const Settings = () => {
  const { user } = useUserContext();
  return (
    <>
      {user?.colaborador.id ? (
        <Dashboard />
      ) : !user?.colaborador.id ? (
        <UserSettings />
      ): null}
    </>
  );
};

export default Settings;

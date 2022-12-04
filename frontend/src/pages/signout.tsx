import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../stores";

export const SignOut = () => {
  const { userStore } = useStore();
  const navigate = useNavigate();

  const logout = async () => {
    await userStore.logout();
  };

  useEffect(() => {
    logout().then(() => navigate("/"));
  }, []);
  return <></>;
};

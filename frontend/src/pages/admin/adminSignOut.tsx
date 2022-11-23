import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useStore } from "../../stores";
import { useNavigate } from "react-router-dom";

export const AdminSignOut = () => {
  const { userStore } = useStore();
  const navigate = useNavigate();

  const logout = async () => {
    await userStore.logout();
  };

  useEffect(() => {
    logout().then(() => navigate("/admin"));
  }, []);
  return <></>;
};

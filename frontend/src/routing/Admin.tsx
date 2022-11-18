import { Route, Routes } from "react-router-dom";
import { AdminSignIn } from "../pages/admin/adminsignin";

export const Admin = () => {
  return (
    <Routes>
      <Route path={`/signin`} element={<AdminSignIn />} />
    </Routes>
  );
};

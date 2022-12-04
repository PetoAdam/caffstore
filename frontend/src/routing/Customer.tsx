import { Route, Routes } from "react-router-dom";
import { Pages } from "../constants/pages";
import { SignIn } from "../pages/signIn";
import { SignOut } from "../pages/signout";
import { SignUp } from "../pages/signUp";

export const Customer = () => {
  return (
    <Routes>
      <Route path={`/${Pages.signin.toLowerCase()}`} element={<SignIn />} />
      <Route path={`/${Pages.signup.toLowerCase()}`} element={<SignUp />} />
      <Route path={`/${Pages.logout.toLowerCase()}`} element={<SignOut />} />
    </Routes>
  );
};

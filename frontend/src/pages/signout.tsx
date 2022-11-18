import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useStore } from "../stores";

export const SignOut = () => {
  const { userStore } = useStore();

  useEffect(() => {
    signOut(auth)
      .then(() => {
        userStore.setIsLoggedIn(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });
  return <></>;
};

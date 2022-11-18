import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Pages } from "./constants/pages";
import { AdminSignIn } from "./pages/admin/adminsignin";
import { SignOut } from "./pages/signout";
import { SignIn } from "./pages/signIn";
import { SignUp } from "./pages/signUp";
import { CustomerLayout } from "./routing/CustomerLayout";
import { AdminLayout, ProtectedAdminLayout } from "./routing/AdminLayout";
import { useStore } from "./stores";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

function App() {
  const { userStore } = useStore();

  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      setLoggedIn(true);
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.data()?.isAdmin) setIsAdmin(true);
    } else {
      setLoggedIn(false);
    }
  });

  useEffect(() => {
    if (loggedIn && isAdmin) userStore.setIsAdmin(true);
    else if (loggedIn) userStore.setIsLoggedIn(true);
    else userStore.setIsLoggedIn(false);
  }, [loggedIn]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<CustomerLayout />}>
            <Route
              path={`${Pages.signin.toLowerCase()}`}
              element={<SignIn />}
            />
            <Route
              path={`${Pages.signup.toLowerCase()}`}
              element={<SignUp />}
            />
            <Route
              path={`${Pages.logout.toLowerCase()}`}
              element={<SignOut />}
            />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path={`signin`} element={<AdminSignIn />} />
            <Route
              element={<ProtectedAdminLayout isAdmin={userStore.isAdmin} />}
            >
              <Route path={`signout`} element={<SignOut />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

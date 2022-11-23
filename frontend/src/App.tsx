import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Pages } from "./constants/pages";
import { AdminSignIn } from "./pages/admin/adminSignIn";
import { SignOut } from "./pages/signout";
import { SignIn } from "./pages/signIn";
import { SignUp } from "./pages/signUp";
import { CustomerLayout } from "./routing/CustomerLayout";
import { AdminLayout, ProtectedAdminLayout } from "./routing/AdminLayout";
import { useStore } from "./stores";
import { AdminSignOut } from "./pages/admin/adminSignOut";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { EditUsers } from "./pages/admin/editUsers";

function App() {
  const { userStore } = useStore();

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await userStore.setIsLoggedIn(true);
    } else {
      await userStore.setIsLoggedIn(false);
    }
  });

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
          <Route element={<AdminLayout />}>
            <Route path={"/admin/signin"} element={<AdminSignIn />} />
          </Route>
          <Route
            path="/admin"
            element={<ProtectedAdminLayout isAdmin={userStore.isAdmin} />}
          >
            <Route path={`signout`} element={<AdminSignOut />} />
            <Route path={`users`} element={<EditUsers />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { Pages } from "./constants/pages";
import { AdminSignIn } from "./pages/admin/adminSignIn";
import { SignOut } from "./pages/signout";
import { SignUp } from "./pages/signUp";
import { CustomerLayout } from "./routing/CustomerLayout";
import { AdminLayout, ProtectedAdminLayout } from "./routing/AdminLayout";
import { useStore } from "./stores";
import { AdminSignOut } from "./pages/admin/adminSignOut";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { EditUsers } from "./pages/admin/editUsers";
import { EditProducts } from "./pages/admin/adminProducts";
import { Products } from "./pages/products";
import { Upload } from "@mui/icons-material";
import ErrorPage from "./pages/error";
import { SignIn } from "./pages/signIn";

function App() {
  const { userStore } = useStore();

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await userStore.setIsLoggedIn(true);
    } else {
      await userStore.setIsLoggedIn(false);
    }
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <CustomerLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: `${Pages.signin.toLowerCase()}`,
          element: <SignIn />,
        },
        {
          path: `${Pages.signup.toLowerCase()}`,
          element: <SignUp />,
        },
        {
          path: `${Pages.logout.toLowerCase()}`,
          element: <SignOut />,
        },
        {
          path: `${Pages.products.toLowerCase()}`,
          element: <Products />,
        },
        {
          path: `${Pages.upload.toLowerCase()}`,
          element: <Upload />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "signin",
          element: <AdminSignIn />,
        },
      ],
    },
    {
      path: "/admin",
      element: <ProtectedAdminLayout isAdmin={userStore.isAdmin} />,
      children: [
        {
          path: "signout",
          element: <AdminSignOut />,
        },
        {
          path: "users",
          element: <EditUsers />,
        },
        {
          path: "products",
          element: <EditProducts />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

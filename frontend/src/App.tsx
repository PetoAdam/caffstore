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
import ErrorPage from "./pages/error";
import { SignIn } from "./pages/signIn";
import { useState } from "react";
import { CaffPreview } from "./pages/caffPreview";
import { Welcome } from "./pages/welcome";
import { Cart } from "./pages/Cart";
import { AdminCaffPreview } from "./pages/admin/adminCaffPreview";
import { Upload } from "./pages/upload";

const App = () => {
  const { userStore, caffStore } = useStore();

  const [isAdmin, setIsAdmin] = useState(false);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await userStore.setIsLoggedIn(true);
      setIsAdmin(userStore.isAdmin);
    } else {
      await userStore.setIsLoggedIn(false);
      setIsAdmin(userStore.isAdmin);
    }
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <CustomerLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <Welcome /> },
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
          path: `${Pages.products.toLowerCase()}/:id`,
          element: <CaffPreview />,
        },
        {
          path: `${Pages.upload.toLowerCase()}`,
          element: <Upload />,
        },
        {
          path: `${Pages.cart.toLowerCase()}`,
          element: <Cart />,
        },
      ],
    },

    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { path: "/admin", element: <Welcome /> },
        {
          path: "signin",
          element: <AdminSignIn />,
        },
      ],
    },
    {
      path: "/admin",
      element: <ProtectedAdminLayout isAdmin={isAdmin || userStore.isAdmin} />,
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
        {
          path: `${Pages.products.toLowerCase()}/:id`,
          element: <AdminCaffPreview />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

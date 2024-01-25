import "./App.css";
import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { usersData } from "./utils/data";
import RootLayout from "./pages/Root";
import ProductsPage, { loader as productsLoader } from "./pages/ProductsPage";
import ProductDetailsPage, {
  loader as productDetailsLoader,
} from "./pages/ProductDetailsPage";
import ProductsRoot from "./pages/ProductsRoot";
import Login, { action as authAction } from "./components/authentication/Login";
import { tokenLoader, checkAuthLoader } from "./utils/functionUtils";
import { logoutAction } from "./pages/Logout";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import CartDetails from "./pages/cartDetails";
import ErrorPage from "./pages/errorPage";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const RECORDS_PER_PAGE = 10;
  const indexOfLastRecord = currentPage * RECORDS_PER_PAGE;
  const indexOfFirstRecord = indexOfLastRecord - RECORDS_PER_PAGE;
  // console.log("indexOfFirstRecord= ", indexOfFirstRecord, "indexOfLastRecord= ", indexOfLastRecord);

  // Records to be displayed on current page
  const currentRecords = usersData.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(usersData.length / RECORDS_PER_PAGE);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      id: "root",
      loader: tokenLoader,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "auth",
          element: <Login />,
          action: authAction,
        },
        {
          path: "products",
          element: <ProductsRoot />,
          children: [
            { index: true, element: <ProductsPage />, },
            {
              path: ":productId",
              id: "productDetail",
              loader: productDetailsLoader,
              children: [
                {
                  index: true,
                  element: <ProductDetailsPage />,
                },
              ],
            },
            {
              path: "category/:categoryId",
              element: <CategoryPage />,
            }
          ],
        },
        {
          path: "shopping-cart",
          element: <CartDetails />,
        },
        {
          path: "logout",
          element: <></>,
          action: logoutAction,
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
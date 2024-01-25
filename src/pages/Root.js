import React, { useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MenuBar from "../components/products/menuBar";

export const RootLayout = () => {
  const token = useLoaderData();
  const submit = useSubmit();

//   useEffect(() => {
//     if (!token) {
//       submit(null, { method: "post", action: "/logout" });
//       return;
//     }
//   }, [token, submit]);

  return (
    <>
      <MenuBar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;

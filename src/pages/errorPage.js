import React from "react";
import { useRouteError } from "react-router-dom";
import MenuBar from "../components/products/menuBar";

export const ErrorPage = () => {
  const error = useRouteError();
  let errorMessage = "Something went wrong!";
  let title = "An error occured!";

  switch (error.status) {
    case 500:
      errorMessage = error.data.message;
      title = "An Internal Server Error occured!";
      break;

    case 404:
      errorMessage = "Could not found resource or page!";
      title = "Page not found!";
      break;

    default:
      errorMessage = "Something went wrong!";
      break;
  }

  return (
    <>
    <MenuBar />
      {error.status && (
        <>
          <h1>{title}</h1>
          <p>{errorMessage}</p>
        </>
      )}
    </>
  );
};

export default ErrorPage;

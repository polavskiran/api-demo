import React from "react";
import { json, redirect } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";

export const Login = () => {
  return <LoginPage />;
};

export const action = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode.trim() !== "login") {
    throw json({
      message: "Unsupported mode.",
      status: 422,
    });
  }

  const formData = await request.formData();

  const authObjData = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const authResponse = await fetch("https://dummyjson.com/auth/login", {
    method: "post",
    body: JSON.stringify(authObjData),
    headers: { "Content-type": "application/json" },
  });

  const errorResponses = [400, 401, 422, 404];

  if (errorResponses.includes(authResponse.status)) {
    return authResponse;
  }

  if (!authResponse.ok) {
    throw json({
      message: "Failed to Authenticate.",
      status: 500,
    });
  }
  const response = await authResponse.json();
  const token = response.token;
  localStorage.setItem("authToken", token);

  return redirect("/");
};

export default Login;

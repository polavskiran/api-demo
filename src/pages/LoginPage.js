import React from "react";
import { Form, useActionData } from "react-router-dom";
import classes from "./loginPage.module.css";
import { Button } from "@mui/material";

export const LoginPage = () => {
  const data = useActionData();
  console.log("Error data=", data);

  return (
    <>
    {data && <span>{data.message}</span>}
    <Form className={classes.form} method="post">
      <h2>Login</h2>
      <p>
        <label htmlFor="username">UserName</label>
        <input type="text" id="username" name="username" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
      </p>
      <div>
        <Button type="submit" variant="contained">
          {"Login"}
        </Button>
      </div>
    </Form>
    </>
  );
};

export default LoginPage;

// import { useState } from 'react';
import {
  Form,
  Link,
  useSearchParams,
  useNavigation,
  useActionData,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const navigation = useNavigation();
  const actionData = useActionData();

  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        {actionData && actionData.errors && (
          <ul>
            {Object.values(actionData.errors).map((err) => (
              <li>{err}</li>
            ))}
          </ul>
        )}
        {actionData && actionData.message && <p>{actionData.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          {!isSubmitting && (
            <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
              {isLogin ? "Create new user" : "Login"}
            </Link>
          )}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Loading.." : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;

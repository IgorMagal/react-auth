import { redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const AuthenticationPage = () => {
  return <AuthForm />;
};

export default AuthenticationPage;

export const action = async ({ request }) => {
  console.log("start of action");
  console.log(window.location.search);

  const searchParams = new URLSearchParams(window.location.search);
  console.log(searchParams);
  let mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    mode = "login";
  }

  const data = Object.fromEntries(await request.formData());
  console.log(`data: ${data.email}`);
  const authData = {
    email: data.email,
    password: data.password,
  };
  console.log(`authData: ${authData.email}`);
  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: `Unable to complete the ${mode} request.` }),
      {
        status: response.status,
        statusText: `Unable to complete the ${mode} request.`,
      }
    );
  }

  const responseData = await response.json();
  const token = responseData.token;
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  console.log("expiration: " + expiration);
  console.log("token: " + token);
  localStorage.setItem("loginToken", token);
  localStorage.setItem("tokenExpiration", expiration.toISOString());
  return redirect("/");
};

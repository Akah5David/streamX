import { redirect } from "react-router-dom";

export async function authAction({ request, params }) {
  const formData = await request.formData();

  const authType = params.authType;

  let bodyObject = {};

  if (authType === "signup") {
    bodyObject = {
      userName: formData.get("username"),
      userEmail: formData.get("userEmail"),
      userPassword: formData.get("userPassword"),
    };
  }

  if (authType === "login") {
    bodyObject = {
      userEmail: formData.get("userEmail"),
      userPassword: formData.get("userPassword"),
    };
  }

  if (authType === "reset-password") {
    bodyObject = {
      userEmail: formData.get("userEmail"),
    };
  }

  try {
    const response = await fetch(
      `http://localhost:3000/auth/${authType}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyObject),
      }
    );

    if (!response.ok) {
      throw new Error(`${authType} request failed`);
    }

    const data = await response.json();

    console.log("Response data:", data);

    if (authType === "signup") {
      return redirect("/auth/login");
    }

    if (authType === "login") {
      return redirect("/");
    }

    if (authType === "reset-password") {
      return redirect("/auth/login");
    }
  } catch (err) {
    console.error("Error:", err);

    return {
      error: err.message,
    };
  }
}
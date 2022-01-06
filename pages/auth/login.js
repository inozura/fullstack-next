import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import Router from "next/router";
import { unauthPage } from "../../middlewares/authorizationPage";
import Link from "next/link";
import { Card, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export async function getServerSideProps(ctx) {
  await unauthPage(ctx);

  return { props: {} };
}

export default function Login() {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState("normal");

  async function loginHandler(e) {
    e.preventDefault();

    setStatus("loading");

    const loginReq = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    if (!loginReq.ok) return setStatus("error " + loginReq.status);

    const loginRes = await loginReq.json();

    setStatus("success");

    Cookie.set("token", loginRes.token);

    Router.push("/posts");
  }

  function fieldHandler(e) {
    const name = e.target.getAttribute("name");

    setFields({
      ...fields,
      [name]: e.target.value,
    });
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ width: 320, padding: 3 }}>
        <Typography variant="h4">Login</Typography>

        <form onSubmit={loginHandler.bind(this)}>
          <Stack spacing={1} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              name="email"
              onChange={fieldHandler.bind(this)}
              type="text"
              placeholder="Email"
            />
          </Stack>
          <br />
          <Stack spacing={1} sx={{ my: 1 }}>
            <TextField
              fullWidth
              name="password"
              onChange={fieldHandler.bind(this)}
              type="password"
              placeholder="Password"
            />
          </Stack>
          <Stack justifyContent="space-between" flexDirection="row">
            <LoadingButton
              type="submit"
              loading={status === "loading"}
              variant="contained"
            >
              Login
            </LoadingButton>

            <Link href="/auth/register">
              <a>Register</a>
            </Link>
          </Stack>
        </form>
      </Card>
    </div>
  );
}

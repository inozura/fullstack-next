import React, { useState } from "react";
import { unauthPage } from "../../middlewares/authorizationPage";
import Link from "next/link";
import { Card, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export async function getServerSideProps(ctx) {
  await unauthPage(ctx);

  return { props: {} };
}

export default function Register() {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState("normal");

  async function registerHandler(e) {
    e.preventDefault();

    setStatus("loading");

    const registerReq = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!registerReq.ok) return setStatus("error " + registerReq.status);

    const registerRes = await registerReq.json();

    setStatus("success");
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
        <Typography variant="h4">Register</Typography>

        <form onSubmit={registerHandler.bind(this)}>
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
              Register
            </LoadingButton>

            <Link href="/auth/login">
              <a>Login</a>
            </Link>
          </Stack>
        </form>
      </Card>
    </div>
  );
}

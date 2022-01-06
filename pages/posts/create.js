import React, { useState } from "react";
import { authPage } from "../../middlewares/authorizationPage";
import Router from "next/router";
import Nav from "../../components/Nav";
import { Card, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  return {
    props: {
      token,
    },
  };
}

export default function PostCreate(props) {
  const [fields, setFields] = useState({
    title: "",
    content: "",
  });

  const [status, setStatus] = useState("normal");

  async function createHandler(e) {
    e.preventDefault();

    setStatus("loading");

    const { token } = props;

    const create = await fetch("/api/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(fields),
    });

    if (!create.ok) return setStatus("error");

    const res = await create.json();

    setStatus("success");

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
    <>
      <Nav />

      <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
        <Card sx={{ width: "50%", padding: 2 }}>
          <Stack justifyContent="center" alignItems="center">
            <form onSubmit={createHandler.bind(this)}>
              <Stack spacing={3}>
                <TextField
                  onChange={fieldHandler.bind(this)}
                  type="text"
                  placeholder="Title"
                  name="title"
                />
              </Stack>
              <br />
              <Stack spacing={2}>
                <TextField
                  onChange={fieldHandler.bind(this)}
                  placeholder="Content"
                  name="content"
                  multiline
                  minRows={5}
                />
              </Stack>
              <br />

              <Stack>
                <LoadingButton
                  type="submit"
                  loading={status === "loading"}
                  variant="outlined"
                >
                  Create Post
                </LoadingButton>
              </Stack>
            </form>
          </Stack>
        </Card>
      </Stack>
    </>
  );
}

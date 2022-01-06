import React, { useState } from "react";
import { authPage } from "../../../middlewares/authorizationPage";
import Router from "next/router";
import Nav from "../../../components/Nav";
import { Card, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  const { id } = ctx.query;

  const postReq = await fetch("http://localhost:3000/api/posts/detail/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const res = await postReq.json();

  return {
    props: {
      token,
      post: res.data,
    },
  };
}

export default function PostEdit(props) {
  const { post } = props;

  const [fields, setFields] = useState({
    title: post.title,
    content: post.content,
  });

  const [status, setStatus] = useState("normal");

  async function updateHandler(e) {
    e.preventDefault();

    setStatus("loading");

    const { token } = props;

    const update = await fetch("/api/posts/update/" + post.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(fields),
    });

    if (!update.ok) return setStatus("error");

    const res = await update.json();

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
            <form onSubmit={updateHandler.bind(this)}>
              <Stack spacing={3}>
                <TextField
                  onChange={fieldHandler.bind(this)}
                  type="text"
                  placeholder="Title"
                  name="title"
                  defaultValue={post.title}
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
                  defaultValue={post.content}
                />
              </Stack>
              <br />

              <Stack>
                <LoadingButton
                  type="submit"
                  loading={status === "loading"}
                  variant="outlined"
                >
                  Edit Post
                </LoadingButton>
              </Stack>
            </form>
          </Stack>
        </Card>
      </Stack>
    </>
  );
}

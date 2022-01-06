import React, { useState } from "react";
import { authPage } from "../../middlewares/authorizationPage";
import Router from "next/router";
import Nav from "../../components/Nav";
import { Avatar, Card, Grid, Stack, Typography } from "@mui/material";
import MyAvatar from "../../components/MyAvatar";
import { server } from "../../config";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  const postReq = await fetch(server + "/api/posts", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const posts = await postReq.json();

  return {
    props: {
      token,
      posts: posts.data,
    },
  };
}

export default function PostIndex(props) {
  const [posts, setPosts] = useState(props.posts);

  async function deleteHandler(id, e) {
    e.preventDefault();

    const { token } = props;

    const ask = confirm("Apakah data ini akan dihapus?");

    if (ask) {
      const deletePost = await fetch("/api/posts/delete/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const res = await deletePost.json();

      const postsFiltered = posts.filter((post) => {
        return post.id !== id && post;
      });

      setPosts(postsFiltered);
    }
  }

  function editHandler(id) {
    Router.push("/posts/edit/" + id);
  }

  return (
    <>
      <Nav />
      <br />
      <Stack sx={{ padding: "10px 13px" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {posts?.map((post) => (
            <Grid spacing={2} item xs={2} sm={4} md={4} key={post.id}>
              <Card sx={{ padding: "10px 18px" }}>
                <Stack direction="row" alignItems="center">
                  <MyAvatar name={post.title} />
                  <Stack
                    justifyContent="unset"
                    alignItems="unset"
                    sx={{ ml: 2 }}
                  >
                    <Typography variant="h5">{post.title}</Typography>
                    <span>{post.content}</span>

                    <Stack direction="row" sx={{ mt: 1 }}>
                      <button onClick={editHandler.bind(this, post.id)}>
                        Edit
                      </button>
                      <button onClick={deleteHandler.bind(this, post.id)}>
                        Delete
                      </button>
                    </Stack>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </>
  );
}

import { Card, Grid, Stack, Typography } from "@mui/material";
import Head from "next/head";
import { useState } from "react";
import MyAvatar from "../components/MyAvatar";
import ResponsiveAppBar from "../components/Navbar";
import Link from "next/link";
import { authPage } from "../middlewares/authorizationPage";
import styles from "../styles/Home.module.css";
import { server } from "../config";
export async function getServerSideProps(ctx) {
  // const { token } = await authPage(ctx);

  const postReq = await fetch(server + "/api/posts");

  const posts = await postReq.json();

  return {
    props: {
      posts: posts.data,
    },
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);

  return (
    <div style={styles}>
      <ResponsiveAppBar />
      <br />
      <Stack sx={{ padding: 2 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {posts?.map((post) => (
            <Grid spacing={2} item xs={2} sm={4} md={4} key={post.id}>
              <Link href={`/detail/${post.id}`}>
                <Card sx={{ padding: "10px 18px", cursor: "pointer" }}>
                  <Stack direction="row" alignItems="center">
                    <MyAvatar name={post.title} />
                    <Stack
                      justifyContent="unset"
                      alignItems="unset"
                      sx={{ ml: 2 }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          display: "-webkit-box",
                          overflow: "hidden",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1,
                        }}
                      >
                        {post.title}
                      </Typography>
                      <span
                        style={{
                          display: "-webkit-box",
                          overflow: "hidden",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                        }}
                      >
                        {post.content}
                      </span>
                    </Stack>
                  </Stack>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </div>
  );
}

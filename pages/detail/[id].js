import React from "react";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Typhograhpy from "@mui/material/Typography";
import ResponsiveAppBar from "../../components/Navbar";

export async function getServerSideProps(ctx) {
  // const { token } = await authPage(ctx);
  const { id } = ctx.query;

  const detailReq = await fetch("http://localhost:3000/api/posts/detail/" + id);

  const posts = await detailReq.json();

  return {
    props: {
      post: posts.data,
    },
  };
}

const Detail = (props) => {
  return (
    <>
      <ResponsiveAppBar />
      <br />
      <Stack
        sx={{ padding: 2, height: "100%" }}
        justifyContent="center"
        alignItems="center"
      >
        <Card sx={{ width: "65%", height: "100%", padding: 2 }}>
          <Typhograhpy variant="h5">{props.post.title}</Typhograhpy>
          <Typhograhpy variant="body1" textAlign="right">
            {props.post.content}
          </Typhograhpy>
        </Card>
      </Stack>
    </>
  );
};

export default Detail;

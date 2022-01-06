import Link from "next/link";
import Cookie from "js-cookie";
import Router from "next/router";
import { Box, Card, Stack, Link as MLink, Chip } from "@mui/material";

export default function Nav() {
  function logoutHandler(e) {
    e.preventDefault();

    Cookie.remove("token");

    Router.replace("/auth/login");
  }

  return (
    <Stack
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      <Card
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "8px 10px",
        }}
      >
        <Box>
          <MLink underline="none" component={Link} href="/posts">
            <Chip label="Posts" />
          </MLink>
        </Box>
        <Box
          height="100%"
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <MLink underline="none" component={Link} href="/posts/create">
            <Chip label="Create Posts" />
          </MLink>
        </Box>
        <Box>
          <MLink underline="none">
            <Chip label="Logout" clickable onClick={logoutHandler.bind(this)} />
          </MLink>
        </Box>
      </Card>
    </Stack>
  );
}

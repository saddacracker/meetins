import NextLink from "next/link";
import Router from "next/router";
import {
  Card,
  Box,
  Button
} from "@material-ui/core";
import { GetServerSideProps, NextPage } from "next";
import auth0 from "../../../libs/auth0";

const SecretPage: NextPage<{
  username?: string;
  error?: string;
}> = (props) => {
  return (
    <Box>
      <Card>
        <NextLink href="/" passHref>
          <a>Home</a>
        </NextLink>
      </Card>
      <Card>
        <h2>
          {props.error ? "You are not logged in" : "Welcome"}
        </h2>
        <pre style={{margin: "1rem"}}>{props.error ?? props.username}</pre>
        <Button
          variant="contained" 
          color="primary" 
          disableElevation
          style={{margin: "1rem"}}
          onClick={() =>
            Router.push(props.error ? `/api/login` : `/api/logout`)
          }
        >
          {props.error ? "Log in" : "Log out"}
        </Button>
      </Card>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}) => {
  try {
    const { user } = await auth0.getSession(req, null);
    return {
      props: {
        username: user.name,
      },
    };
  } catch (error) {
    return {
      props: { error: error.message },
    };
  }
};

export default SecretPage;
import { NextApiHandler } from "next";
import auth0 from "../../../../libs/auth0"

// const redirectRoute = {redirectTo: "/secret"};

const callback: NextApiHandler = async (req, res) => {
    try {
      await auth0.handleCallback(req, res);
    } catch (error) {
      console.error(error);
      res.status(error.status || 500).end(error.message);
    }
  };
  
  export default callback;
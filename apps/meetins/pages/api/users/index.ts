import { NextApiHandler } from "next";
import data from "../../../../../libs/data.json"

const users: NextApiHandler = (req, res) => {
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).end();
  }
};

export default users;
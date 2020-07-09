import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import "./config/db";
import routes from "./apis/routes";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());
routes(app);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

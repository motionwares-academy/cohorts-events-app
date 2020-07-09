import express from "express";

import users from "../controllers/user";
import { auth } from "../../config/middleware";

const router = express.Router();

router.post("/register", users.createUser);
router.post("/login", users.userLogin);
router.get("/user/me", auth, users.userProfile);

export { router as userRouter };

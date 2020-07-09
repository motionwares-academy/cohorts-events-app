import { userRouter } from "./user";

export default (app) => {
  app.use(userRouter);
};

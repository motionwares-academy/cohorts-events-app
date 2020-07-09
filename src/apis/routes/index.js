import { userRouter } from "./user";
import { eventsRouter } from "./events";

export default (app) => {
  app.use(userRouter);
  app.use(eventsRouter);
};

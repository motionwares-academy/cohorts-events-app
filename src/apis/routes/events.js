import express from "express";

import events from "../controllers/events";
import { auth } from "../../config/middleware";

const router = express.Router();

router.post("/create-event", auth, events.createEvent);
router.get("/view-personal-events", auth, events.viewPersonalEvents);
router.post("book-event/:eventId", auth, events.bookEvent);
router.post("/cancel-booking/:eventId", auth, events.cancelBooking);

export { router as eventsRouter };

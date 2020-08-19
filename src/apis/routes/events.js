import express from "express";

import events from "../controllers/events";
import { auth } from "../../config/middleware";

import { parser } from "../../services/fileUpload";

const router = express.Router();

router.post("/create-event", auth, parser.single("image"), events.createEvent);
router.get("/view-personal-events", auth, events.viewPersonalEvents);
router.post("book-event/:eventId", auth, events.bookEvent);
router.post("/cancel-booking/:eventId", auth, events.cancelBooking);
router.get("/view_booked_events", auth, events.viewPersonalBookedEvents);
router.get("/registered_users/:eventId", auth, events.viewRegisteredUsers);

export { router as eventsRouter };

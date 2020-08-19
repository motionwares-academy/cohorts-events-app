import dotenv from "dotenv";

import User from "../../models/user";
import Event from "../../models/events";

dotenv.config();

export default {
  createEvent: async (req, res, next) => {
    try {
      console.log(req.file);

      if (req.file) {
        const newEvent = new Event({
          name: req.body.name,
          price: req.body.price,
          date: req.body.date,
          category: req.body.category,
          avatar: req.file.path,
          created_by: req.user._id
        });

        const savedEvent = await newEvent.save();

        await User.findByIdAndUpdate(
          req.user._id,
          { $push: { events_created: savedEvent._id } },
          { new: true }
        );

        return res.json({
          msg: "Event created succesfully",
          event: savedEvent
        });
      } else {
        const newEvent = new Event({
          name: req.body.name,
          price: req.body.price,
          date: req.body.date,
          category: req.body.category,
          created_by: req.user._id
        });

        const savedEvent = await newEvent.save();

        await User.findByIdAndUpdate(
          req.user._id,
          { $push: { events_created: savedEvent._id } },
          { new: true }
        );

        return res.json({
          msg: "Event created succesfully",
          event: savedEvent
        });
      }
    } catch (err) {
      // res.json({ msg: err });
      throw err;
    }
  },

  viewPersonalEvents: async (req, res, next) => {
    try {
      const personalEvents = await Event.find({ created_by: req.user._id });

      if (personalEvents.length === 0) {
        return res.json({ msg: "No events creted Yet" });
      }

      res.json({
        events: personalEvents
      });
    } catch (err) {
      res.json({ msg: err });
    }
  },

  bookEvent: async (req, res, next) => {
    try {
      const findEvent = await Event.findById(req.params.eventId);

      if (!findEvent) {
        return res.json({ msg: "Event not found" });
      }

      await Event.findByIdAndUpdate(
        req.params.eventId,
        { $push: { registered_users: req.user._id } },
        { new: true }
      );

      await User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { events_register_for: findEvent._id }
        },
        { new: true }
      );

      res.json({
        msg: "Registered successfully"
      });
    } catch (err) {
      res.json({ msg: err });
    }
  },

  cancelBooking: async (req, res, next) => {
    try {
      const findEvent = await Event.findById(req.params.eventId);

      if (!findEvent) {
        return res.json({ msg: "Event not found" });
      }

      await Event.findByIdAndUpdate(
        req.params.eventId,
        { $pull: { registered_users: req.user._id } },
        { new: true }
      );

      await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { events_register_for: findEvent._id } },
        { new: true }
      );

      res.json({
        msg: "Booking cancelled"
      });
    } catch (err) {
      res.json({ msg: err });
    }
  },

  // View all events booked by a single user
  viewPersonalBookedEvents: async (req, res, next) => {
    try {
      const bookedEvents = await Event.find({
        _id: req.user.events_register_for
      });

      if (!bookedEvents.length === 0) {
        return res.json({ msg: "You have not registered for any events" });
      }

      res.json({
        events: bookedEvents
      });
    } catch (err) {
      res.json({ msg: err });
    }
  },

  // View users who registered for a single events
  viewRegisteredUsers: async (req, res, next) => {
    try {
      const findEvent = await Event.findById(req.params.eventId).populate({
        path: "registered_users",
        select: "full_name phone_number"
      });

      if (!findEvent) {
        return res.json({ msg: "Event not found" });
      }

      res.json({
        events: findEvent
      });
    } catch (err) {
      res.json({ msg: err });
    }
  }
};

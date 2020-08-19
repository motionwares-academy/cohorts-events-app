import mongoose, { Schema } from "mongoose";

const EventSchema = new Schema({
  name: {
    type: String
  },
  price: {
    type: String
  },
  date: {
    type: Date
  },
  category: {
    type: String
  },
  avatar: {
    type: String
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  registered_users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

export default mongoose.model("Event", EventSchema);

// Weddings
// Seminars
// Birthdays
// General

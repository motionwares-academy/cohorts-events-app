import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  full_name: {
    type: String
  },
  email: {
    type: String
  },
  password: String,
  phone_number: {
    type: String
  },
  events_created: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event"
    }
  ],
  events_register_for: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event"
    }
  ]
});

export default mongoose.model("User", UserSchema);

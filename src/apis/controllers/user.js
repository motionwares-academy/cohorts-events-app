import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import User from "../../models/user";

dotenv.config();

export default {
  createUser: async (req, res, next) => {
    try {
      const findUser = await User.findOne({ email: req.body.email });

      if (findUser) {
        return res.json({ msg: "User with email already exist" });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 12);

      const newUser = new User({
        full_name: req.body.full_name,
        email: req.body.email,
        password: hashedPassword,
        phone_number: req.body.phone_number
      });

      const savedUser = await newUser.save();

      const token = await jwt.sign(
        { userId: savedUser._id },
        process.env.JWT_SECRET
      );

      res.json({
        msg: "User created successfully",
        userToken: token,
        user: savedUser
      });
    } catch (err) {
      res.json({ msg: err });
    }
  },

  userLogin: async (req, res, next) => {
    try {
      const userEmail = await User.findOne({ email: req.body.email });

      if (!userEmail) {
        return res.json({ msg: "Incorrect login details" });
      }

      const passwordMatch = await bcrypt.compare(
        req.body.password,
        userEmail.password
      );

      if (!passwordMatch) {
        return res.json({ msg: "Incorrect login details" });
      }

      const token = await jwt.sign(
        { userId: userEmail._id },
        process.env.JWT_SECRET
      );

      res.json({
        msg: token,
        user: userEmail
      });
    } catch (err) {
      res.json({ msg: err });
    }
  },

  userProfile: async (req, res, next) => {
    try {
      res.json({
        user: req.user
      });
    } catch (err) {
      res.json({ msg: err });
    }
  }
};

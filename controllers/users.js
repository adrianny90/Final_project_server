import User from "../models/User.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Resend } from "resend";
import { emailSample } from "../email/email.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomBytes(32).toString("hex");
  try {
    const checkUser = await User.find({ email });
    if (checkUser.length)
      throw new ErrorResponse("User with such email already exists", 409);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verificationToken,
    });
    const verificationUrl = `${process.env.CLIENT_URL}/verify/${verificationToken}`;
    // console.log("userdatatocreate", user);

    //onboarding@resend.dev
    await resend.emails.send({
      from: "berlinGive@asdasd.ddns-ip.net",
      to: email,
      subject: "Verify Your Email",
      html: emailSample(firstName, verificationUrl),
    });
    res.status(201).json(user);
  } catch (error) {
    throw new ErrorResponse(error.message, 401);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    throw new ErrorResponse("Failed to fetch users", 500);
  }
};

export const getUser = async (req, res) => {
  const { email, password, email_verified } = req.body;
  console.log(email, password, email_verified, "emailverified");

  try {
    if (typeof email_verified === "undefined") {
      const findUser = await User.findOne({ email }).select("+password");
      console.log("tu jestem", findUser);

      if (!findUser)
        return res.status(404).json({ message: "Could not find user" });

      //Check if user typed password matches with hashed password on DB
      const isMatch = await bcrypt.compare(password, findUser.password);
      if (!isMatch) throw new ErrorResponse("Invalid credentials", 400);
      if (!findUser.isVerified)
        throw new ErrorResponse("User not verified", 404);
      //Generate a JWT token to be sent to client
      const token = jwt.sign(
        { id: findUser._id, role: findUser.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      // console.log(token);

      const isProduction = process.env.NODE_ENV === "production";
      const cookieOptions = {
        httpOnly: true, // Cookies are only sent with HTTP requests
        secure: isProduction, // Cookies are only sent with https when on production and http on development
        sameSite: isProduction ? "None" : "Lax",
      };

      const userResponse = findUser.toObject();
      console.log("userResponse", userResponse);
      delete userResponse?.password;

      res.cookie("token", token, cookieOptions);
      res.status(201).json({ message: "Successfully logged in", userResponse });
    } else {
      const findUser = await User.findOne({ email });
      console.log(findUser);

      if (!findUser)
        return res.status(404).json({ message: "Could not find user" });
      //Generate a JWT token to be sent to client
      const token = jwt.sign(
        { id: findUser._id, role: findUser.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      // console.log(token);

      const isProduction = process.env.NODE_ENV === "production";
      const cookieOptions = {
        httpOnly: true, // Cookies are only sent with HTTP requests
        secure: isProduction, // Cookies are only sent with https when on production and http on development
        sameSite: isProduction ? "None" : "Lax",
      };

      const userResponse = findUser.toObject();
      console.log("userResponse", userResponse);

      delete userResponse?.password;

      res.cookie("token", token, cookieOptions);
      res.status(201).json({ message: "Successfully logged in", userResponse });
    }
  } catch (error) {
    throw new ErrorResponse("Something went wrong", 400);
  }
};

export const deleteUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const findUser = await User.findOne({ email });
    if (!findUser)
      return res.status(404).json({ message: "Could not find user" });
    const deletedUser = await User.findOneAndDelete({ email });
    res.status(200).json(deletedUser);
  } catch (error) {
    throw new ErrorResponse("Something went wrong", 400);
  }
};

export const updateUser = async (req, res) => {
  const { firstName, lastName, email, address } = req.body;
  let coords = address?.location?.coordinates;
  try {
    const findUser = await User.findOne({ email });
    if (!findUser) throw new ErrorResponse("User not found", 404);
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        firstName,
        lastName,
        address: {
          ...address,
          location: {
            type: "Point",
            coordinates: coords,
          },
        },
      },
      { new: false }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    const errorData = error.message;
    throw new ErrorResponse(errorData || "Something went wrong", 400);
  }
};

export const signOut = async (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";
  const cookieOptions = {
    httpOnly: true, // Cookies are only sent with HTTP requests
    secure: isProduction, // Cookies are only sent with https when on production and http on development
    sameSite: isProduction ? "None" : "Lax",
  };

  res.clearCookie("token", cookieOptions);
  res.status(200).json({ message: "Goodbye!" });
};

export const me = async (req, res) => {
  const user = await User.findById(req.userId);

  res.status(200).json(user);
};

export const verifyUser = async (req, res) => {
  // console.log(req.body);
  const { verificationToken } = req.body;
  try {
    const findUser = await User.findOne({ verificationToken });

    if (!findUser) throw new ErrorResponse("User not found", 404);
    const updatedUser = await User.findOneAndUpdate(
      { verificationToken },
      { isVerified: true },
      { new: false }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    throw new ErrorResponse("Something went wrong", 400);
  }
};

export const getOwners = async (req, res) => {
  const allItems = req.body;
  let userIds = [];
  allItems.forEach((element) => {
    userIds.push(element.userId);
  });
  // console.log(userIds);

  try {
    const owners = await User.find({ _id: { $in: userIds } });
    if (!owners) {
      return res.status(404).json({ message: "Owner not found" });
    }
    // console.log(owners);

    res.status(200).json(owners);
  } catch (error) {
    console.error("Error in getting owner:", error);
    return res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const getRelatedUsers = async (req, res) => {
  // console.log(req.body);
  try {
    const persons = await User.find({
      $or: [{ _id: { $in: req.body } }],
    });
    if (!persons) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(persons);
    // console.log(persons);
  } catch (error) {
    console.error("Error in fetching related users:", error);
    return res.status(500).json({ message: error.message || "Server Error" });
  }
};

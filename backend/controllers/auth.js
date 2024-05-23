import User from "../models/user.js";
import Doctor from "../models/doctorModel.js";
import Appointment from "../models/appointmentModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import moment from "moment";

dotenv.config();

export async function signUp(req, res) {
  try {
    const { email, username, password, firstName, lastName } = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ email, username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Salt
    const salt = await bcrypt.genSalt();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user in the database
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
      firstName,
      lastName,
    });

    // Generate a JWT token
    const token = jwt.sign(
      {
        email: newUser.email,
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ newUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error\n${error.message}` });
  }
}

export async function signIn(req, res) {
  try {
    const { username, password } = req.body;
    // Check if the user exists
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { username: existingUser.username, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      existingUser,
      token,
      message: "User signed in successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error. ${error.message}` });
  }
}

export async function getUserData(req, res) {
  try {
    const { username } = req.body;
    const existingUser = await User.find({ username: username });

    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    return res.status(200).json({ data: existingUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Server error. ${error.message}` });
  }
}

// Apply For Doctor
export async function applyDoctorController(req, res) {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      phone,
      address,
      specialization,
      experience,
      feesPerCunsaltation,
    } = req.body;
    const user = {
      firstName,
      lastName,
      username,
      email,
      phone,
      address,
      specialization,
      experience,
      feesPerCunsaltation,
      status: "pending",
    };
    const newDoctor = await Doctor(user);

    const existingDoctor = await Doctor.findOne({ email, username });

    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    await newDoctor.save();

    const adminUser = await User.findOne({ isAdmin: true });

    await User.findByIdAndUpdate(adminUser._id);
    res.status(201).json({
      message: "Applied for Doctor Account Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Server Error While Applying For Doctor Account.${error.message}`,
    });
  }
}

export async function getAllDoctors(req, res) {
  try {
    const doctors = await Doctor.find({ status: "approved" });
    res.status(200).json({
      message: "Doctors' List Fetched Successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Error While Fetching Doctors' List. ${error}`,
    });
  }
}

export async function bookAppointment(req, res) {
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(200).json({
      message: "Appointment Booked Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Error While Booking Appointment. ${error}`,
    });
  }
}

export async function userAppointments(req, res) {
  try {
    const appointments = await Appointment.find({
      userId: req.body.userId,
    });
    res.status(200).json({
      message: "User Appointments Fetched Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Error While Fetching Appointments. ${error}`,
    });
  }
}

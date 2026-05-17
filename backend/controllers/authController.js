import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import crypto from 'crypto';
import { sendResetEmail } from '../utils/mail.js';

class AuthController {
  static SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";
  static EXPIRATION = process.env.EXPIRATION || "1h";
  static REFRESH_SECRET_KEY =
    process.env.REFRESH_SECRET_KEY || "your_refresh_secret_key";
  static REFRESH_EXPIRATION = process.env.REFRESH_EXPIRATION || "7d";

  static generateToken(userId) {
    const refreshtoken = jwt.sign(
      { id: userId },
      AuthController.REFRESH_SECRET_KEY,
      { expiresIn: AuthController.REFRESH_EXPIRATION }
    );
    const accesstoken = jwt.sign({ id: userId }, AuthController.SECRET_KEY, {
      expiresIn: AuthController.EXPIRATION,
    });
    return { accesstoken, refreshtoken };
  }

  static async signUp(req, res) {
    const { username, email, password } = req.body;
    const data = { username, email, password };

    try {
      for (const key of ["username", "email", "password"]) {
        if (!data[key]) {
          return res.status(400).json({
            status: "error",
            message: `field ${key} is required`,
          });
        }
      }
      if (await User.findOne({ username })) {
        return res.status(400).json({
          status: "error",
          message: `username already exists, choose another username`,
        });
      }

      if (await User.findOne({ email })) {
        return res.status(400).json({
          status: "error",
          message: `email already exists, please login`,
        });
      }
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          status: "error",
          message: `password must be 8-20 characters long and contain at least one letter and one number`,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const createData = { username, email, password: hashedPassword };

      const user = await User.create(createData);
      return res
        .status(201)
        .json({ status: "success", message: `user created`, id: user._id });
    } catch (error) {
      console.error("error creating user, error:", error);
      return res
        .status(500)
        .json({ status: "error", message: "failed to create user" });
    }
  }

  static async logIn(req, res) {
    const { username, password } = req.body;
    const data = { username, password };
    try {
      for (const key of ["username", "password"]) {
        if (!data[key]) {
          return res
            .status(400)
            .json({ status: "error", message: `field ${key} is required` });
        }
      }
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({
          status: "error",
          message: `username or password is not correct`,
        });
      }
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res.status(400).json({
          status: "error",
          message: `username or password is not correct`,
        });
      }

      const token = AuthController.generateToken(user._id);

      // Set cookies
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax", // Prevent CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000,
      };

      res.cookie("refreshToken", token.refreshtoken, cookieOptions);
      res.cookie("accessToken", token.accesstoken, {
        ...cookieOptions,
        maxAge: 1 * 60 * 60 * 1000, // 1 hour for access token
      });

      const responseData = {
        message: `Welcome back ${user.username},`,
        userId: user._id,
      };
      return res.status(201).json(responseData);
    } catch (error) {
      console.log("login error:", error);
      res.status(500).json({ status: "false", message: "server error" });
    }
  }

  static async logOut(req, res) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res
      .status(200)
      .json({ status: "success", message: "Logged out successfully" });
  }

  static async forgotPassword(req, res) {
    const { email } = req.body;
    try {
      if (!email) {
        return res.status(400).json({ status: "error", message: "Email is required" });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ status: "error", message: "User with this email does not exist" });
      }

      const token = crypto.randomBytes(20).toString('hex');
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      await user.save();

      await sendResetEmail(email, token);
      
      return res.status(200).json({ 
        status: "success", 
        message: "Password reset link has been sent to your email"
      });
    } catch (error) {
      console.error("Forgot password error:", error);
      return res.status(500).json({ status: "error", message: "Server error" });
    }
  }

  static async resetPassword(req, res) {
    const { token, password } = req.body;
    try {
      if (!token || !password) {
        return res.status(400).json({ status: "error", message: "Token and password are required" });
      }

      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
      });

      if (!user) {
        return res.status(400).json({ status: "error", message: "Password reset token is invalid or has expired" });
      }

      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          status: "error",
          message: `password must be 8-20 characters long and contain at least one letter and one number`,
        });
      }

      user.password = await bcrypt.hash(password, 10);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      return res.status(200).json({ status: "success", message: "Password has been reset" });
    } catch (error) {
      console.error("Reset password error:", error);
      return res.status(500).json({ status: "error", message: "Server error" });
    }
  }
}

export default AuthController;
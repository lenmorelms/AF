import express from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import sendVerificationEmail from "../utils/email.js";
import { capitalizeFirstLetter, sanitizeInput } from "../utils/formatInput.js";
import { protect } from "../Middleware/auth.js";

const userRouter = express.Router();
// register
userRouter.route("/register").post(asyncHandler(async (req, res) => {
    try {
        const { email, age, gender, country, isAdmin } = req.body;
        const username = capitalizeFirstLetter(req.body.username);
        const password = sanitizeInput(req.body.password);

        const userExists = await User.findOne({ email });
        const usernameTaken = await User.findOne({ username });
        const userNotVerifield = await User.findOne({ email, username, verified: false });

        if(userExists) res.status(409).json({ message: "User already exists" });
        if(usernameTaken) res.status(409).json({ message: "Username is taken" });
        if(userNotVerifield) res.status(409).json({ message: "User not verifield" });

        const verificationToken = Math.random().toString(36).substring(7);
        const user = new User({ email, username, age, gender, country, password, isAdmin, verificationToken });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        await sendVerificationEmail(email, verificationToken, "register"); 
        res.status(201).json({ message: 'User created successfully', user });
    }catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error...");
    }  
}));
// login
userRouter.route("/login").post(asyncHandler(async (req, res) => {
    try {
        const { email } = req.body;
        const password = sanitizeInput(req.body.password);
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Check password
        if (!user.password) {
            console.error('User password is undefined');
            return res.status(500).json({ message: 'Server Error: User password is missing' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
           return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Check if user is verifield
        if(user.verified === false) {
            return res.status(401).json({ message: 'User not verifield' });
        }
        // Generate JWT token
        const payload = {
            user: {
              id: user.id
            }
        };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" }, (err, token) => {
           if (err) throw err;
           res.json({ token, user });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error..."); 
    }
}));
// forgot password
userRouter.route("/forgot-password").patch(asyncHandler(async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
      
        if (user) {
            const verificationToken = Math.random().toString(36).substring(7);
            user.verificationToken = verificationToken;
            await user.save();
            await sendVerificationEmail(email, verificationToken, "forgot-password");
            res.status(200).json({ message: "Check your email for the reset link" });
        } else {
            return res.status(204).json({ message: "Email does not exist" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error..."); 
    }
}));
// reset password
userRouter.route("/reset-password/:id").patch(asyncHandler(async (req, res) => {
    try {
        const verificationToken = req.params.id;
        const password = sanitizeInput(req.body.password);
        const user = await User.findOne({ verificationToken });

        if(user) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            res.status(201).json({ message: "Password reset successfully" });
        } else {
            return res.status(404).json({ message: "Invalid verification token" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error...");
    }
}));
// verify account
userRouter.route("/verify").put(asyncHandler(async (req, res) => {
    try {
        // const verificationToken = req.params.id;
        const { verificationToken } = req.body;
        const user = await User.findOne({ verificationToken });
        if (user) {
            user.verified = true;
            await user.save();
    
            //  // Generate JWT token
             const payload = {
              user: {
                id: user.id
              }
            };
        
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" }, (err, token) => {
              if (err) throw err;
              res.json({ token, user });
            });
            // res.json({ user, verificationToken });
          } else {
            return res.status(404).json({ message: "Invalid verification code" });
          } 
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error..."); 
    }
}));
// resend verification code
userRouter.route("/resend-code/:id").get(asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
          sendVerificationEmail(user.email, user.verificationToken, "register");
          res.status(200).json({ message: "Verification link sent to your email" });
        } else {
          return res.status(404).json({ message: "User does not exist" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Sever Error...");
    }
}));
// get profile
userRouter.route("/profile").get(protect, asyncHandler(async (req, res) => {
    try {
        // The user is authenticated, so req.user contains the authenticated user
        res.json({ user: req.user});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Sever Error...");
    } 
})); 
// update profile
userRouter.route("/profile/:id").put(protect, asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (user) {
            user.username = req.body.username || user.username;
            user.age = req.body.age || user.age;
            user.gender = req.body.gender || user.gender;
            user.email = req.body.email || user.email;
            user.country = req.body.country || user.country;
            user.tournaments = req.body.tournaments || user.tournaments;
            user.leagues = req.body.leagues || user.leagues;
            user.isAdmin = req.body.isAdmin || user.isAdmin;
            user.verified = req.body.verified || user.verified;
            user.verificationToken = req.body.verificationToken || user.verificationToken;
            // const salt = await bcrypt.genSalt(10);
            // user.password = await bcrypt.hash(sanitizeInput(req.body.password), salt) || user.password;

            await user.save();
            res.status(201).json({ message: "Profile updated successfully", user }); 
        } else {
            res.status(404).json({ message: "Failed to update, Try again!" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Sever Error...");
    }
}));
// delete profile [***WIP***]
userRouter.route("/profile/:id").delete(protect, asyncHandler(async (req, res) => {
    try {
        const user = User.findById(req.params.id);
        if(user) {
            await User.deleteOne({ _id: req.params.id });

            // delete from other schemas/models
            await Promise.all([
                // 
            ]);
            res.clearCookie("jwt");
            res.status(200).json({ message: "User deleted successfully." });
        } else {
            return res.status(204).json({ message: "User not found" });
        } 
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Sever Error...");
    }
}));
// logout
userRouter.route("/logout").post(protect, asyncHandler(async (req, res) => {
    try {
        // Clear session (if you're using sessions)
        // req.logout();

        // Clear JWT token (if you're using JWT)
        // res.clearCookie("jwt");
        res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0), // Set the cookie expiration date to the past
            secure: process.env.NODE_ENV === 'production', // Ensure this is only true in production
            sameSite: 'strict' // Set sameSite attribute for security
        });

        // Optionally, you can also send a response indicating successful logout
        res.json({ message: "Logout successful" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Sever Error..."); 
    }
}));

export default userRouter;
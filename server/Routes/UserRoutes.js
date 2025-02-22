import express from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import sendVerificationEmail from "../utils/email.js";
import { capitalizeFirstLetter, sanitizeInput } from "../utils/formatInput.js";
import { adminProtect, protect } from "../Middleware/auth.js";
import Fixture from "../Models/Fixture.js";
import Prediction from "../Models/Prediction.js";
import PlayerTable from "../Models/TournamentPlayerTable.js";

const userRouter = express.Router();
// get user data
userRouter.route("/:userId").get(asyncHandler(async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log("Fetching user data for userId:", userId);
        const user = await User.findOne({ userId });
        if(user) {
            return res.status(201).json({ user })
        } else {
            return res.status(409).json({ user })
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error...");
    }

}));
// register
userRouter.route("/register").post(asyncHandler(async (req, res) => {
    try {
        const { email, username, country, tournaments, password, verified, isAdmin } = req.body;
        const sanitizedUsername = capitalizeFirstLetter(username);
        const salt = await bcrypt.genSalt(10);
        const sanitizedPassword = await bcrypt.hash(sanitizeInput(password), salt);
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: "User already exists" });
        }

        const usernameTaken = await User.findOne({ username: sanitizedUsername });
        if (usernameTaken) {
            return res.status(409).json({ message: "Username is taken" });
        }

        const userNotVerified = await User.findOne({ email, username: sanitizedUsername, verified: false });
        if (userNotVerified) {
            return res.status(409).json({ message: "User not verified" });
        }

        const verificationToken = Math.random().toString(36).substring(7);
        const user = new User({
            email,
            username: sanitizedUsername,
            country,
            tournaments,
            password: sanitizedPassword,
            isAdmin,
            verified,
            verificationToken
        });
        await user.save();
        await sendVerificationEmail(email, verificationToken, "register"); 
        res.status(201).json({ message: 'User created successfully', user });
    }catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error...");
    }  
}));
// admin create account
userRouter.route("/admin/register").post(asyncHandler(async (req, res) => {
    try {
        const { email, isAdmin, verified } = req.body;
        const username = capitalizeFirstLetter(req.body.username);
        const password = sanitizeInput(req.body.password);

        const adminExists = await User.findOne({ email });
        const usernameTaken = await User.findOne({ username });

        if(adminExists) res.status(409).json({ message: "Admin already exists" });
        if(usernameTaken) res.status(409).json({ message: "Username is taken" });

        const admin = new User({ email, usernam, password, isAdmin, verified });
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(password, salt);
        await admin.save(); 
        res.status(201).json({ message: 'Admin created successfully', admin });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error...");
    }

}));
// admin edit account
userRouter.route("/admin/:id").put(asyncHandler(async (req, res) => {
    try {
        const admin = await User.findById(req.params.id);
        if (admin) {
            admin.email = req.body.email || admin.email;
            admin.username = capitalizeFirstLetter(req.body.username) || admin.username;

            await admin.save();
            res.status(201).json({ message: "Profile updated successfully", admin }); 
        } else {
            res.status(404).json({ message: "Failed to update, Try again!" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Sever Error...");
    }
}));
// admin delete user
userRouter.route("/admin/:id").delete(asyncHandler(async (req, res) => {
    try {
        const admin = User.findById(req.params.id);
        if(admin) {
            await User.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: "Profile deleted successfully." });
        } else {
            return res.status(204).json({ message: "Profile not found" });
        } 
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Sever Error...");
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
        // Check if user is verified
        if(user.verified === false) {
            return res.status(401).json({ message: 'User not verified' });
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
        console.log('Received verification token:', verificationToken);
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
            res.json({ user, verificationToken });
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
// admin get profile
userRouter.route("/admin/profile").get(adminProtect, asyncHandler(async (req, res) => {
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
            // user.age = req.body.age || user.age;
            // user.gender = req.body.gender || user.gender;
            user.email = req.body.email || user.email;
            user.country = req.body.country || user.country;
            user.tournaments = req.body.tournaments || user.tournaments;
            user.leagues = req.body.leagues || user.leagues;
            user.isAdmin = req.body.isAdmin || user.isAdmin;
            user.verified = req.body.verified || user.verified;
            user.verificationToken = req.body.verificationToken || user.verificationToken;
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(sanitizeInput(req.body.password), salt) || user.password;

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


userRouter.route("/bot/addtables/:id/:tournamentId").post(asyncHandler(async (req, res) => {
    try {
        const { id, tournamentId } = req.params;
        const { username, team } = req.body;

        const playerExists = await PlayerTable.findOne({ tournamentId, userId: id });
        if(playerExists) {
            res.status(2024).json({ message: "Player is part of the table" });
        } else {
            const addPlayer = new PlayerTable({
                tournamentId,
                userId: id,
                username,
                team
            });
            await addPlayer.save();
            res.status(201).json({ message: "Player added to table", addPlayer });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Sever Error...");
    }
}));
// BOT USERES PREDICTIONS
const getRandomNumber = () => {
    return Math.floor(Math.random() * 6);
}
userRouter.route("/bot/predictions/:id").post(asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { tournamentId, round } = req.body;
        const fixtures = await Fixture.find({ tournamentId, round });
        
        if (fixtures && fixtures.length > 0) {
            const predictions = [];

            for (const fixture of fixtures) {
                const fixtureId = fixture._id;
                const checkPlayerPrediction = await Prediction.findOne({ userId: id, tournamentId, fixtureId });

                if (checkPlayerPrediction) {
                    console.log("Prediction already exists for a fixture" );
                } else {
                    const prediction = new Prediction({
                        userId: id, 
                        tournamentId, 
                        fixtureId, 
                        round, 
                        predictedHomeScore: getRandomNumber(), 
                        predictedAwayScore: getRandomNumber()
                    });
                    await prediction.save();
                    predictions.push(prediction);
                    console.log(fixtureId+` Prediction Added`);
                }
            }

            res.status(201).json({ message: "Predictions saved", predictions });
        } else {
            res.status(204).json({ message: "No fixtures found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error...");
    }
}));

userRouter.route("/bot/verifyall").put(asyncHandler(async (req, res) => {
    try {
        const users = await User.find({ verified: false });
        if(users && users.length > 0) {
            for(const user of users) {
                user.verified = true;
                await user.save();
                console.log(user.username+` Verified`);
            }
            res.status(201).json({ message: "Users verifield"});
        } else {
            res.status(204).json({ message: "No users found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Sever Error...");
    }
}));

userRouter.route("/bot/tournament/:id/:tournamentId").get(asyncHandler(async (req, res) => {
    try {
        const { id, tournamentId } = req.params;
        const { tourName, playerTeam } = req.body;
        const newTournaments = [];
        const user = await User.findById(id);
        // res.status(204).json({user});
        if(user) {
            user.tournaments.map((tournament) => {
                newTournaments.push(tournament);
            });
            newTournaments.push({               
                "tournId": tournamentId,
                "tourName": tourName,
                "playerTeam": playerTeam
            });
            user.tournaments = newTournaments;
            await user.save();
            res.status(201).json({ user });
        } else {
            res.status(204).json({ message: "User does not exist" });
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Sever Error...");
    }
}))

export default userRouter;
import dotenv from "dotenv";
import passport from "passport";
import {Strategy, ExtractJwt} from "passport-jwt";
import User from "../Models/User.js";

dotenv.config();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};
      
passport.use(
    new Strategy(opts, async (jwt_payload, done) => {
     try {
       // Check if the user associated with the token exists in the database
       const user = await User.findById(jwt_payload.user.id);
      
        if (user) {
           // If user exists, return them as authenticated
           return done(null, user);
        } else {
          // If user does not exist, return false
          return done(null, false);
        }
    } catch (err) {
        console.error(err);
        return done(err, false);
    }
  })
);

const protect = passport.authenticate('jwt', { session: false });

const adminProtect = (req, res, next) => {
  protect(req, res, async () => {
    if (req.user && req.user.isAdmin) {
      return next();
    } else {
      res.status(403).json({ message: "Access denied. Admins only." });
    }
  });
};

export { protect, adminProtect };
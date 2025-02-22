import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import device from "express-device";
import connectDatabase from "./Config/mongoDB.js";
import userRouter from "./Routes/UserRoutes.js";
import fixtureRouter from "./Routes/FixtureRoutes.js";
import tournamentRouter from "./Routes/TournamentRoutes.js";
import predictionRouter from "./Routes/PredictionRoutes.js";
import leagueRouter from "./Routes/LeagueRoutes.js";
import finalsFixtureRouter from "./Routes/FinalsFixtureRoute.js";
import finalsPredictionRouter from "./Routes/FinalsPredictionRoute.js";
import finalsTournamentRouter from "./Routes/FinalsTournamentRoutes.js";

dotenv.config();
connectDatabase();
const app = express();


// Use the express-device middleware
app.use(device.capture());
// Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(express.static("public"));
app.use("/images", express.static("images"));

app.get("/device", (req, res) => {
    const deviceType = req.device.type;
    res.json({ deviceType });
});
app.use("/api/users", userRouter);                          // tested
app.use("/api/tournaments", tournamentRouter);              // tested
app.use("/api/finalstournaments", finalsTournamentRouter);  
app.use("/api/fixtures", fixtureRouter);                    // tested
app.use("/api/finalsfixtures", finalsFixtureRouter);         //......
app.use("/api/predictions", predictionRouter);              // tested
app.use("/api/finalspredictions", finalsPredictionRouter);  //.......
app.use("/api/leagues", leagueRouter);                      // tested

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
export default app;
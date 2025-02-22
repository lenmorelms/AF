import mongoose from "mongoose";

// Connect to MongoDB
// const connectDatabase = () => {
//     mongoose.connect(process.env.MONGO_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });
//     const db = mongoose.connection;
//     db.on("error", console.error.bind(console, "MongoDB connection error:"));
//     db.once("open", () => {
//       console.log("Connected to MongoDB");
//     });
// };

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDatabase;
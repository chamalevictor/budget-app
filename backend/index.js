import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";

const app = express();
dotenv.config(); // To access env variables
app.use(express.json()); // To use req.body

// Configure CORS.
const whiteList = ["http://127.0.0.1:5173"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"));
    }
  },
};

// TODO: reactivate cors options.
app.use(cors());
// Routing
app.use("/api/users", userRoutes);
app.use("/api/accounts", accountRoutes);

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`Server running on port ${process.env.BACKEND_PORT}`);
});

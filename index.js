import express from "express";
import mongoose from "mongoose";
import taskRoutes from "./routes/taskRoutes.js";


const app = express();
app.use(express.json()); // Parse JSON



// MongoDB connection
await mongoose.connect("mongodb://localhost:27017/taskManager", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



console.log("✅ MongoDB Connected");

// Routes
app.use("/tasks", taskRoutes);

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});



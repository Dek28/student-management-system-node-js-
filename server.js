const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/teachers", require("./routes/teacherRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/classes", require("./routes/classRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/exams", require("./routes/examRoutes"));
app.use("/api/results", require("./routes/resultRoutes"));
app.use("/api/announcements", require("./routes/announcementRoutes"));

app.get("/", (req, res) => res.send("Student Management API Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

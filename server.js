const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const socketio = require("socket.io");
const userRouter = require("./routes/userRoutes");
const socketIo = require("./socket");
const groupRouter = require("./routes/groupRoutes");
const messageRouter = require("./routes/messageRoutes");
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});
//middlewares
app.use(cors());
app.use(express.json());
//connect to db
//mongoose.connect(process.env.MONGO_URL)
mongoose.connect("mongodb+srv://naresh:qUuoLKKYU0wXL3PG@cluster1.euppa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1")
.then(() => {
  console.log('Connected to DB');
})
.catch((err) => {
  console.error('Connection failed:', err);
});




// Middlewares


// Connect to DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || "mongodb+srv://naresh:qUuoLKKYU0wXL3PG@cluster1.euppa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1");
    console.log("Connected to DB");
  } catch (err) {
    console.error("Mongodb connected failed", err);
    process.exit(1);
  }
};

// Initialize
/*const init = async () => {
  await connectDB();
  socketIo(io);
};

// Routes
app.get("/", (req, res) => {
  res.json({
    project: "MERN Chat App using Socket.IO",
    message: "Welcome to MERN Chat Application",
    developedBy: "MasynTech",
    website: "www.masynctech.com",
  });
});

app.use("/api/users", userRouter);
app.use("/api/groups", groupRouter);
app.use("/api/messages", messageRouter);

// Start the server*/


//Initialize
socketIo(io);
//our routes
app.get("/", (req, res) => {
  res.json({
    project: "MERN Chat App using Socket.IO",
    message: "Welcome to MERN Chat Application",
    developedBy: "MasynTech",
    website: "www.masynctech.com",
  });
});
app.use("/api/users", userRouter);
app.use("/api/groups", groupRouter);
app.use("/api/messages", messageRouter);

//start the server
const PORT = 5000;
server.listen(PORT, console.log("Server is up and running on port", PORT));

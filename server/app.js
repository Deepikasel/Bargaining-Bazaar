

// server/app.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const nodemailer = require("nodemailer");

dotenv.config();
const app = express();
//app.use(cors());

app.use(cors({ origin: "*" }));

app.use(express.json());

// routes
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);

// connect mongo
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>console.log("MongoDB Connected ✅"))
  .catch(err=>console.log("MongoDB Error:", err));

// Nodemailer transporter (optional — used to notify seller)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// server + socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET","POST"] }
});

// helper: room name for private chat between customer and seller for a product
const makeRoomName = (productId, senderEmail, sellerEmail) => {
  // stable canonical order: productId + seller + customer (seller first)
  return `${productId}-${sellerEmail}-${senderEmail}`;
};

const Chat = require("./models/Chat");

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (roomData) => {
    const { productId, senderEmail, sellerEmail } = roomData || {};
    if (!productId || !senderEmail || !sellerEmail) {
      console.log("Missing data to join room:", roomData);
      return;
    }
    const room = makeRoomName(productId, senderEmail, sellerEmail);
    socket.join(room);
    console.log(`${senderEmail} joined room: ${room}`);
  });

  socket.on("sendMessage", async (data) => {
    const { productId, userName, sender, message, senderEmail, sellerEmail } = data || {};
    if (!productId || !message || !senderEmail || !sellerEmail) {
      console.log("Missing chat data:", data);
      return;
    }

    try {
      // save to DB
      const chat = new Chat({ productId: String(productId), userName, sender, message, senderEmail, sellerEmail });
      await chat.save();

      const room = makeRoomName(productId, senderEmail, sellerEmail);
      // emit to that private room
      io.to(room).emit("receiveMessage", chat);

      // send email notification to seller (optional — only if sender is not the seller)
      if (senderEmail !== sellerEmail && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: sellerEmail,
          subject: `New message about your product ${productId}`,
          text: `You have a new message from ${userName} (${senderEmail}):\n\n${message}`
        }, (err, info) => {
          if (err) console.log("Email Error:", err);
          else console.log("Email sent:", info.response);
        });
      }
    } catch (err) {
      console.error("Error saving/sending chat:", err);
    }
  });

  socket.on("disconnect", () => console.log("User disconnected:", socket.id));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT} ✅`));





const express = require('express');
const cors = require('cors');
const http = require('http')
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const NotificationRoutes = require("./routes/notificationRoutes");
const {initializeSocket} = require("./sockets/socketHandler");
// const profileRoutes = require('./routes/profileRoutes');
const app = express();
const server = http.createServer(app);

initializeSocket(server);

//Middleware
app.use(express.json());
// app.use(cors());
app.use(cors({ origin: "http://localhost:3000" }));

//mongo connection
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Mongodb connected'))
.catch(err => console.log(err));

//routes
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/search', require('./routes/searchRoutes'));
app.use("/api/auth", authRoutes);
app.use("/api/notifications", NotificationRoutes);
// app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require('express');
// // const cors = require('cors');
// const cors = require("cors");

// app.use(
//   cors({
//     origin: "http://localhost:3000", // Frontend URL
//     credentials: true, // Allow cookies (if needed)
//     allowedHeaders: ["Content-Type", "Authorization"], // Allow token header
//   })
// );

// const http = require('http');
// const mongoose = require('mongoose');
// require('dotenv').config();

// const authRoutes = require('./routes/authRoutes');
// const notificationRoutes = require("./routes/notificationRoutes");
// const { initializeSocket } = require("./sockets/socketHandler");

// const app = express();
// const server = http.createServer(app);

// // Initialize WebSocket
// initializeSocket(server);

// // Middleware
// app.use(express.json());
// app.use(cors({ origin: "http://localhost:3000" }));

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// // Routes
// app.use('/api/upload', require('./routes/uploadRoutes'));
// app.use('/api/search', require('./routes/searchRoutes'));
// app.use("/api/auth", authRoutes);
// app.use("/api/notifications", notificationRoutes);

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

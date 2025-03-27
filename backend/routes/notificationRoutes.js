const express = require("express");
const { getUserNotifications, markAsRead } = require("../controllers/notificationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

console.log("in notification routes...")
router.get("/", authMiddleware, getUserNotifications);
router.put("/:id/read", authMiddleware, markAsRead);

module.exports = router;

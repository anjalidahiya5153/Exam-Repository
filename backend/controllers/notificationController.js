const Notification = require("../models/Notification");
const { getIoInstance } = require("../sockets/socketHandler");

exports.createNotification = async (userId, message) => {
  try {
    const notification = new Notification({ userId, message });
    await notification.save();
    
    const io = getIoInstance();
    
    console.log(`Sending notification to user ${userId}`);
    io.to(userId.toString()).emit("newNotification", notification);

  } catch (error) {
    console.error("Error creating notification:", error);
  }
};

exports.getUserNotifications = async (req, res) => {
    try {
        console.log("Decoded User from Middleware in notificationController:", req.user); // Debugging
            //req.user is actually the id of hte user
        if (!req.user) {
            console.log("req.user is undefined in notification controller");
            return res.status(401).json({ message: "Unauthorized: No user object" });
        }

        console.log("req.user is valid, proceeding to fetch notifications...");
        const notifications = await Notification.find({ userId: req.user }).sort({ createdAt: -1 });
        console.log("notifications : ", notifications );
        res.status(200).json(notifications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
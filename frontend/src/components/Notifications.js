import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const socket = io("http://localhost:5000", { transports: ["websocket"] });

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("No token found, user needs to log in");
      return;
    }
  
    console.log("Token being sent:", token); // Debugging
  
    axios.get("http://localhost:5000/api/notifications", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => setNotifications(res.data))
    .catch((err) => {
      console.error("############################Axios Error:", err);
      if (err.response) {
        console.error("Error Response:", err.response);
      }
    });
  }, []);
  

  useEffect(() => {
    axios.get("http://localhost:5000/api/notifications")
      .then((res) => setNotifications(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.map((noti) => (
        <div key={noti._id} style={{ background: noti.isRead ? "#ddd" : "#f9f9f9", padding: "10px", marginBottom: "5px" }}>
          {noti.message}
        </div>
      ))}
    </div>
  );
};

export default Notifications;

// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";

// const Notifications = ({ userId }) => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     const socket = io("http://localhost:5000", { transports: ["websocket"] });

//     socket.emit("join", userId);

//     socket.on("newNotification", (notification) => {
//       setNotifications((prev) => [notification, ...prev]);
//     });

//     return () => {
//       console.log("Disconnecting WebSocket...");
//       socket.disconnect();
//     };
//   }, [userId]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     console.log("Sending token:", token); // Debugging

//     axios
//       .get("http://localhost:5000/api/notifications", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => setNotifications(res.data))
//       .catch((err) => console.error("Axios Error:", err.response)); // Log error

//   }, []);

//   return (
//     <div>
//       <h2>Notifications</h2>
//       {notifications.map((noti) => (
//         <div key={noti._id} style={{ background: noti.isRead ? "#ddd" : "#f9f9f9", padding: "10px", marginBottom: "5px" }}>
//           {noti.message}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Notifications;

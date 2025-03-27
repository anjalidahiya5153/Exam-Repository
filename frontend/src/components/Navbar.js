// import React from "react";
// import { Link } from "react-router-dom";
// import "../styles/Navbar.css";
// import { AuthContext } from "../context/AuthContext";

// const Navbar = ({ setShowLogin, setShowSignup }) => {
  
//   return (
//     <nav className="navbar">
//       <div className="nav-logo">
//         <Link to="/">ExamRepo</Link>
//       </div>
//       <ul className="nav-links">
//         <li><Link to="/profile">Profile</Link></li>
//         <li><Link to="/upload">Upload</Link></li>
//         <li>
//           <button className="nav-button login" onClick={() => setShowLogin(true)}>
//             Login
//           </button>
//         </li>
//         <li>
//           <button className="nav-button signup" onClick={() => setShowSignup(true)}>
//             Sign Up
//           </button>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css"; 

const Navbar = ({ setShowLogin, setShowSignup }) => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Exam Archive</h1>
      <div className="navbar-links">
        <Link to="/upload">Upload</Link>
        <Link to="/searchQuestion">Search</Link>
        <Link to="/notifications">Notifications</Link>


        {isLoggedIn ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={logout} className="navbar-button logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="navbar-button" onClick={() => setShowLogin(true)}>Login</button>
            <button className="navbar-button" onClick={() => setShowSignup(true)}>Signup</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

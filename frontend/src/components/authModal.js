import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AuthModal.css";
import { AuthContext } from "../context/AuthContext";

const AuthModal = ({ showLogin, showSignup, setShowLogin, setShowSignup }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    admissionNumber: "",
    semester: "",
    passingYear: "",
    branch: "",
    currentCourses: "",
  });

  const { setIsLoggedIn } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Login Function
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log('in authmodal...')
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      alert("Login successful");
      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);
      setShowLogin(false);
      navigate("/profile");
    } catch (err) {
      alert("Error logging in");
    }
  };

  // Signup Function
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log('in authmodal...')
        const res = await axios.post(
            "http://localhost:5000/api/auth/signup",
            {
              name: formData.username,
              email: formData.email,
              password: formData.password,
              admissionNumber: formData.admissionNumber,
              semester: formData.semester,
              passingYear: formData.passingYear,
              branch: formData.branch,
              currentCourses: formData.currentCourses.split(",").map((course) => course.trim()),
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          

      alert(res.data.message);
      setShowSignup(false);
    } catch (err) {
      alert("Error creating user");
    }
  };

  return (
    <>
      {/* Login Modal */}
      {showLogin && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2 className="modal-title">Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="modal-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="modal-input"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="submit" className="modal-button">Login</button>
            </form>
            <p className="modal-footer">
              Don't have an account?{" "}
              <button onClick={() => { setShowSignup(true); setShowLogin(false); }} className="text-link">
                Sign up here
              </button>
            </p>
            <button onClick={() => setShowLogin(false)} className="modal-close">✕</button>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2 className="modal-title">Sign Up</h2>
            <form onSubmit={handleSignupSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Full Name"
                className="modal-input"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="modal-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="modal-input"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="admissionNumber"
                placeholder="Admission Number"
                className="modal-input"
                value={formData.admissionNumber}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="semester"
                placeholder="Semester (e.g. 4th, 5th)"
                className="modal-input"
                value={formData.semester}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="passingYear"
                placeholder="Passing Year (e.g. 2025)"
                className="modal-input"
                value={formData.passingYear}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="branch"
                placeholder="Branch (e.g. Computer Science)"
                className="modal-input"
                value={formData.branch}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="currentCourses"
                placeholder="Current Courses (comma separated)"
                className="modal-input"
                value={formData.currentCourses}
                onChange={handleChange}
                required
              />
              <button type="submit" className="modal-button">Sign Up</button>
            </form>
            <p className="modal-footer">
              Already have an account?{" "}
              <button onClick={() => { setShowLogin(true); setShowSignup(false); }} className="text-link">
                Login here
              </button>
            </p>
            <button onClick={() => setShowSignup(false)} className="modal-close">✕</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModal;

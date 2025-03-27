// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/Profile.css";
// import { AuthContext } from "../context/AuthContext";

// const Profile = () => {
//   console.log("User component mounted in profile.js");
//   const { user } = useContext(AuthContext);

//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           console.error("No token found, user not authenticated.");
//           setLoading(false);
//           return;
//         }
    
//         const res = await axios.get("http://localhost:5000/api/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
    
//         console.log("Profile fetched:", res.data);
//         setProfile(res.data);
//       } catch (err) {
//         console.error("Error fetching profile", err.response?.data || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
    

//     fetchProfile();
//   }, []);

//   if (loading) {
//     return <p className="loading-message">Loading profile...</p>;
//   }

//   if (!profile) {
//     return <p className="error-message">Profile not found.</p>;
//   }

//   return (
//     <div className="profile-container">
//       <h2>Welcome, {profile?.name || "User"}!</h2>
//       <div className="profile-info">
//         <p><strong>Admission Number:</strong> {profile?.admissionNumber}</p>
//         <p><strong>Email:</strong> {profile?.email}</p>
//         <p><strong>Semester:</strong> {profile?.semester}</p>
//         <p><strong>Passing Year:</strong> {profile?.passingYear}</p>
//         <p><strong>Branch:</strong> {profile?.branch}</p>
//         <p><strong>Current Courses:</strong> {profile?.currentCourses?.join(", ")}</p>
//       </div>
//     </div>
//   );
// };

// export default Profile;


import React, { useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";
import '../styles/Profile.css'

const ProfilePage = () => {
  console.log('UserProfile component mounted');
  const { user } = useContext(AuthContext);
  console.log('User from context:', user);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                setLoading(false);
                return;
            }
            console.log('Fetching profile with token:', token);
           
            const response = await axios.get('http://localhost:5000/api/auth/profile', {
                headers: { Authorization: `Bearer ${token}`, },
            });
            console.log('Profile data:', response.data);
            setProfile(response.data);
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        } finally {
            setLoading(false);
        }
    };

    if (user) {
        fetchProfile();
    } else {
        setLoading(false);
    }
}, [user]);

if (loading) return <div>Loading...</div>;

if (!profile) return <div>No profile data available</div>;



  // return (
  //   <div className="profile-container">
  //     <h1>Welcome, {profile.username}</h1>
  //     <p>Email: {profile.email}</p>
     
  //     <h2>Questions Solved</h2>
      
  //     <h2>Bookmarked Questions</h2>
      
  //   </div>
  // );

  return (
        <div className="profile-container">
          <h2>Welcome, {profile?.name}!</h2>
          <div className="profile-info">
            <p><strong>Admission Number:</strong> {profile?.admissionNumber}</p>
            <p><strong>Email:</strong> {profile?.email}</p>
            <p><strong>Semester:</strong> {profile?.semester}</p>
            <p><strong>Passing Year:</strong> {profile?.passingYear}</p>
            <p><strong>Branch:</strong> {profile?.branch}</p>
            <p><strong>Current Courses:</strong> {profile?.currentCourses?.join(", ")}</p>
          </div>
        </div>
      );
};

export default ProfilePage;


import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const { currentUser, signinWithGoogle, logout, loading } = UserAuth();
 
  const navigate = useNavigate(); 

useEffect(() => {
  if (!loading && currentUser) {
    console.log("Navigating to chat room");
    navigate("/chat");
  }
}, [currentUser, loading, navigate]);
  

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">Join the conversation, meet new people, and make connections.</p>
          {!currentUser ? (
            <button onClick={signinWithGoogle} className="btn btn-primary">
              Login with Google
            </button>
          ) : (
            <button onClick={logout} className="btn btn-secondary">
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

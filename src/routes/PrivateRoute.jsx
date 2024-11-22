import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export const PrivateRoute = ({ children }) => {
  const { currentUser } = UserAuth();
  console.log("PrivateRoute - currentUser:", currentUser); 

    if(!currentUser) {      
        return <Navigate to="/" replace />;
    }
  return children; 
};


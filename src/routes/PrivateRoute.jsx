import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export const PrivateRoute = ({ children }) => {
  const { currentUser } = UserAuth();
  console.log("PrivateRoute - currentUser:", currentUser); // Debugging line
    //const currentUser = false;

    if(!currentUser) {
        //return <Navigate to="/" replace={true} />
        return <Navigate to="/" replace />;
    }
  return children; 
};


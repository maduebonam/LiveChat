import { createContext, useState, useContext, useEffect } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signinWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
   provider.setCustomParameters({ prompt: "select_account" }); 

    try {
      await signInWithPopup(auth, provider);
      console.log("Signed in successfully");
    } catch (error) {
     
       console.error("Error signing in with popup:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth); 
      console.log("User signed out successfully");
      setCurrentUser(null); 
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {    
     setCurrentUser(user || null);
       setLoading(false);
       console.log("Auth state changed:", user); 
     });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signinWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);

import { createContext, useState, useContext, useEffect } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signinWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with popup:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const logout = () => signOut(auth);

  const value = {
    currentUser,
    signinWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);




//import { createContext, useState, useContext, useEffect } from "react";
//import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
//import { auth } from "../firebase";

// create context
//const AuthContext = createContext();
//const AuthContext = createContext();

// Provider Context
//export const AuthProvider = ({ children }) =>{
//const [currentUser, setCurrentUser] = useState(null);
//const [loading, setLoading] = useState(true);



  // signIn with Google using Popup
 // const signinWithGoogle = async () => {
   // const provider = new GoogleAuthProvider();
   // try {
    //  console.log("Signing in...");
    //  await signInWithPopup(auth, provider);
  //  } catch (error) {
    //  console.error("Error signing in with popup:", error);
  //  }
  //};

 // Set up an observer for user's sign-in state
 //useEffect(() => {
   // const unsubscribe = onAuthStateChanged(auth, (user) => {
   //   setCurrentUser(user);
    //  setLoading(false);
      //console.log("Loading status:", loading); // Check if this logs `false` after user is set
    //});
    //return unsubscribe; // Unsubscribe on component unmount
  //}, []);

//signout
//const logout = () => signOut(auth);

//const value = {
//currentUser,
//setCurrentUser,
//signinWithGoogle,
//logout
//};

//return (
 // <AuthContext.Provider value={value}>
   // {/* {!loading && children} */}
    //{loading ? <div>Loading...</div> : children}
 // </AuthContext.Provider>
//);
//};
//export const UserAuth = () => {
 //   return useContext(AuthContext);
//};
//export const UserAuth = () => useContext(AuthContext);
import React, { createContext, useState, useContext, useEffect } from 'react'; 
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, signInWithRedirect } from 'firebase/auth';
import { auth, db } from "@/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false); // Prevent multiple popups

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, []);

  const signinWithGoogle = async () => {
    if (isAuthenticating) return; // Prevent multiple authentication attempts
    setIsAuthenticating(true);

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      await signInWithPopup(auth, provider);
      console.log('Signed in successfully');
    } catch (error) {
      console.error('Error Code:', error.code);
      console.error('Error Message:', error.message);

      if (error.code === 'auth/popup-blocked') {
        alert('The login popup was blocked. Trying redirect method...');
        try {
          await signInWithRedirect(auth, provider); // Fallback to redirect
        } catch (redirectError) {
          console.error('Redirect error:', redirectError);
          alert(`Error during redirect sign-in: ${redirectError.message}`);
        }
      } else if (error.code === 'auth/cancelled-popup-request') {
        alert('Another login attempt is already in progress. Please wait.');
      } else {
        alert(`Error signing in: ${error.message}`);
      }
    } finally {
      setIsAuthenticating(false); // Reset state
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      setCurrentUser(null);
    } catch (error) {
      console.error('Error during sign-out:', error);
      alert(`Error during logout: ${error.message}`);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, signinWithGoogle, logout, loading }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);





// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
// import { auth, db } from "@/firebase";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       setLoading(false);
//     });

//     return () => unsubscribe(); 
//   }, []);

//   const signinWithGoogle = async () => {
//     const provider = new GoogleAuthProvider();
//     provider.setCustomParameters({ prompt: 'select_account' });

//     try {
//       await signInWithPopup(auth, provider);
//       console.log('Signed in successfully');
//     } catch (error) {
//       console.error('Error Code:', error.code);
//       console.error('Error Message:', error.message);

//       if (error.code === 'auth/popup-blocked') {
//         alert('The login popup was blocked. Please allow popups and try again.');
//       } else if (error.code === 'auth/cancelled-popup-request') {
//         alert('Another login attempt is already in progress. Please wait.');
//       } else {
//         alert(`Error signing in: ${error.message}`);
//       }
//     }
//   };

//   const logout = async () => {
//     try {
//       await signOut(auth);
//       console.log('User signed out successfully');
//       setCurrentUser(null);
//     } catch (error) {
//       console.error('Error during sign-out:', error);
//       alert(`Error during logout: ${error.message}`);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ currentUser, signinWithGoogle, logout, loading }}>
//       {loading ? <div>Loading...</div> : children}
//     </AuthContext.Provider>
//   );
// };

// export const UserAuth = () => useContext(AuthContext);


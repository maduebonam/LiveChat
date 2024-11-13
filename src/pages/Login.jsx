import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";


const Login = () => {
  const { currentUser, signinWithGoogle } = UserAuth();
  const navigate = useNavigate();

const handleLogin = async () => {
 // try{
 //await signinWithGoogle();
 // }catch(error){
 //   console.log(error)
 // }
 try {
  console.log("Signing in..."); // Add this line for debugging
  await signinWithGoogle();
  console.log("Signed in successfully"); // Add this line for debugging
} catch (error) {
  console.log("Error signing in:", error); // Modify this line for clarity
}
};

useEffect(() => {
   console.log("Current User:", currentUser); //Debugging line
  // Redirect to the chat room if the user is already logged in
  if (currentUser) {
    navigate("/chat");
  }
}, [currentUser, navigate]); //This runs whenever `currentUser` changes

  return (
    <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold">Hello there</h1>
        <p className="py-6">
          Join the conversation, meet new people, and make connection.
        </p>
        <button onClick={handleLogin} className="btn btn-primary">Login with Google</button>
      </div>
    </div>
  </div>
  )
}

export default Login
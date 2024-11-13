import { UserAuth } from "../context/AuthContext"

const Navbar = () => {
  const { currentUser, logout } = UserAuth();
  console.log("Navbar - currentUser:", currentUser); // Debugging line

  const handleLogout = async () => { 
    try {
      await logout();
      console.log("Logged out successfully"); // Debugging line
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };


  return (
    <div className="navbar bg-neutral text-neutral-content">
        <div className="containerWrap flex justify-between">
          <a className="btn btn-ghost normal-case text-xl">LiveChat</a>
          {currentUser ? 
          <button onClick={handleLogout} className="font-semibold">Logout</button>
         : ""}
        </div>
    </div>
  )
}

export default Navbar
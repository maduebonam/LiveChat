import { Routes, Route } from "react-router-dom";
import ChatRoom from "./pages/ChatRoom";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
      <Routes>        
        <Route path="/" element={<Login />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatRoom />
            </PrivateRoute>
          }
        />
      </Routes>
    
  );
}

export default App;






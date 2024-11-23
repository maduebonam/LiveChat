import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './routes/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

// Lazy loading ChatRoom
const ChatRoom = React.lazy(() => import('./pages/ChatRoom'));

function App() {
  return (
    <AuthProvider>
      <Navbar />
      {/* Use Suspense to handle lazy-loaded components */}
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </AuthProvider>
  );
}

export default App;






// import React from "react";
// import Navbar from "./components/Navbar";
// import ChatRoom from "./pages/ChatRoom";
// import Login from "./pages/Login";
// import { Routes, Route } from "react-router-dom";
// import { PrivateRoute } from "./routes/PrivateRoute";
// import { AuthProvider } from "./context/AuthContext";

// function App() {
  
//   return (

//     <AuthProvider>
//       <Navbar />
//       <Routes>        
//       <Route path="/" element={<Login />} />
//       <Route path="/chat" element={<PrivateRoute><ChatRoom /></PrivateRoute>} />
//       </Routes>
//     </AuthProvider>
//   );
// }

// export default App;

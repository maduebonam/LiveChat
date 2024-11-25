import React from "react";
import ChatBox from "../components/ChatBox";
import Navbar from "../components/Navbar";
import SendMessage from "../components/SendMessage";
const ChatRoom = () => {
  return (
    <div>
      <Navbar />
        <ChatBox />
        <SendMessage />        
    </div>
  )
}

export default ChatRoom;
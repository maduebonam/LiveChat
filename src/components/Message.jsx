 import React from "react";
 import { UserAuth } from "../context/AuthContext";

 const Message = ({ message }) => {
   const { currentUser } = UserAuth();

   return (
     <div
       className={`chat ${
         message.uid === currentUser.uid ? "chat-start" : "chat-end"
       }`}
       >
      <div className="chat-image avatar">
      <div className="w-10 rounded-full">
        <img alt="avatar" src={message.avatar || ""} />
      </div>
     </div>
    <div className="chat-header">{message.name || "Anonymous"}</div>
      <div className="chat-bubble bg-blue-600 text-white">
        {message.text && <p>{message.text}</p>}
       </div>
     </div>
  
 );
};

export default Message;

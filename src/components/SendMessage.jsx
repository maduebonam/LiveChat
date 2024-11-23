import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const SendMessage = () => {
  const [value, setValue] = useState(""); 
  const { currentUser } = UserAuth();

  if (!currentUser) {
    return <div>Please sign in to send messages.</div>;
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();

    
    if (!value.trim()) {
      alert("Enter a message!");
      return;
    }

    
    const message = value.trim(); 
    setValue("");

    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        createdAt: serverTimestamp(),
        uid: currentUser.uid,
        name: currentUser.displayName || "Anonymous",
        avatar: currentUser.photoURL || "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="bg-gray-200 fixed bottom-0 w-full py-4 shadow-lg">
      <form onSubmit={handleSendMessage} className="flex items-center gap-2 px-4">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)} 
          type="text"
          className="w-full px-4 py-2 rounded-lg border focus:outline-none bg-gray-100"
          placeholder="Type your message here..."
        />
        <button
          type="submit"
           className="bg-blue-500 text-white px-4 py-2 rounded-lg sm:px-3 sm:py-1 md:px-5 md:py-3"
          disabled={!value.trim()} 
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SendMessage;

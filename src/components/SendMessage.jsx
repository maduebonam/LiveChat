import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const SendMessage = () => {
  const [value, setValue] = useState("");
  const { currentUser } = UserAuth();

  // Track `value` changes
useEffect(() => {
  console.log("Value changed to:", value);
}, [value]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (value.trim() === "") {
      alert("Enter a valid message!");
      return;
    }

    try {
      const { uid, displayName, photoURL } = currentUser;
      await addDoc(collection(db, "messages"), {
        text: value,
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid
      });
      setValue("");
      e.target.reset(); // Clear the input in the form
    console.log("Input cleared, current value:", value);
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  return (
    <div className="bg-gray-200 fixed bottom-0 w-full py-10 shadow-lg">
      <form onSubmit={handleSendMessage} className="px-3 containerWrap flex">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value.trim())}
          type="text"
          className="input w-full focus:outline-none rounded-r-none bg-gray-100"
        />

        <button type="submit" className="bg-blue-500 w-auto text-white rounded-r-lg text-sm px-6">Send</button>
      </form>
    </div>
  );
};

export default SendMessage;

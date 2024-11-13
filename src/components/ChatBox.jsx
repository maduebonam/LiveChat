//import Message from './Message'; 
//import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
//import { useEffect } from 'react';
//import { db } from "../firebase";
 
import Message from './Message';
import { collection, query, onSnapshot, orderBy, limit } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { db } from "../firebase";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesArr = [];
      querySnapshot.forEach((doc) => {
        messagesArr.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messagesArr);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="pb-44 pt-20 containerWrap">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>   
  );
}

export default ChatBox;

import React, { useEffect, useState, useRef } from 'react';
import { collection, query, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import Message from './Message';




const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt'), limit(50));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const messagesArr = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setMessages(messagesArr);
      },
      (error) => {
        console.error('Error fetching messages:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(scrollToBottom, [messages]);

  // Remove message from the state
  const removeMessage = (id) => {
    setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
  };


  return (
    <div className="pb-44 pt-20 containerWrap sm:pb-20 md:pb-32 lg:pb-44">
      {messages.map((message) => (
        <Message key={message.id} message={message} removeMessage={removeMessage} /> 
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatBox;

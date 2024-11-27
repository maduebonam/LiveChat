import React, { useEffect, useState, useRef } from 'react'; 
import { collection, query, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import Message from './Message';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [retry, setRetry] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchMessages = () => {
      const q = query(collection(db, 'messages'), orderBy('createdAt'), limit(50));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const messagesArr = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMessages(messagesArr);
        },
        (error) => {
          console.error('Firestore Listener Error:', error.code, error.message);
          if (error.code === 'resource-exhausted') {
            alert('You have exceeded Firestore limits. Try again later.');
          } else if (error.message.includes('permission denied')) {
            alert('Check Firestore rules.');
          } else {
            alert(`Unexpected error: ${error.message}`);
          }
        }
      );

      return unsubscribe;
    };
    const unsubscribe = fetchMessages();

    return () => unsubscribe();
  }, []);

  useEffect(scrollToBottom, [messages]);

  const removeMessage = (id) => {
    setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
  };

  return (
    <div className="pb-44 pt-20 containerWrap sm:pb-20 md:pb-32 lg:pb-44">
      {retry && <p className="text-red-500 text-center">Retrying to fetch messages...</p>}
      {messages.map((message) => (
        <Message key={message.id} message={message} removeMessage={removeMessage} />
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatBox;











// import React, { useEffect, useState, useRef } from 'react';
// import { collection, query, onSnapshot, orderBy, limit } from 'firebase/firestore';
// import { db } from '../firebase';
// import Message from './Message';

// const ChatBox = () => {
//   const [messages, setMessages] = useState([]);
//   const [retry, setRetry] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   useEffect(() => {
//     const fetchMessages = () => {
//       const q = query(collection(db, 'messages'), orderBy('createdAt'), limit(50));
//       const unsubscribe = onSnapshot(
//         q,

  
//         (snapshot) => {
//           const messagesArr = snapshot.docs
//             .map((doc) => ({ ...doc.data(), id: doc.id }))
//             .filter((msg) => msg.createdAt); 
//           setMessages(messagesArr);
//           setRetry(false);
//         },
//         (error) => {
//           console.error('Error fetching messages:', error);

         
//           if (error.code === 'resource-exhausted' || error.message.includes('429')) {
//             console.warn('Rate limit exceeded. Retrying in 5 seconds...');
//             setRetry(true);
//             setTimeout(fetchMessages, 5000); 
//           } else {
//             alert(`Error fetching messages: ${error.message}`);
//           }
//         }
//       );
//       return unsubscribe;
//     };

//     const unsubscribe = fetchMessages();

//     return () => unsubscribe();
//   }, []);

//   useEffect(scrollToBottom, [messages]);

//   const removeMessage = (id) => {
//     setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
//   };

//   return (
//     <div className="pb-44 pt-20 containerWrap sm:pb-20 md:pb-32 lg:pb-44">
//       {retry && <p className="text-red-500 text-center">Retrying to fetch messages...</p>}
//       {messages.map((message) => (
//         <Message key={message.id} message={message} removeMessage={removeMessage} />
//       ))}
//       <div ref={messagesEndRef}></div>
//     </div>
//   );
// };

// export default ChatBox;


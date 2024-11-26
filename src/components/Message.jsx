import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';

const Message = ({ message, removeMessage }) => {
  const { currentUser } = UserAuth();
  const [isHighlighted, setIsHighlighted] = useState(false);

  const toggleHighlight = () => setIsHighlighted((prev) => !prev);

  
  

  const handleDelete = () => {
    if (currentUser.uid !== message.uid) return; 
    if (window.confirm('Do you want to delete this message?')) {
      removeMessage(message.id); 
      console.log('Message removed');
    }
  };

    const getBubbleColor = (uid) => {
      const colors = {
        'user1-uid': 'bg-blue-600',
        'user2-uid': 'bg-green-600',
        'user3-uid': 'bg-red-600',
        'user4-uid': 'bg-slate-500',
        'user5-uid': 'bg-black-300',
        'user6-uid': 'bg-gray-950',
        'user7-uid': 'bg-blue-100',
        'user8-uid': 'bg-gray-800',
        'user9-uid': 'bg-slate-900',
        'user10-uid': 'bg-red-600',
        'user11-uid': 'bg-gray-600',
        'user12-uid': 'bg-red-950',
        'user13-uid': 'bg-green-900',
        'user14-uid': 'bg-black-600',
        'user15-uid': 'bg-slate-500',
      };
      return colors[uid] || 'bg-blue-600'; 
    };

  return (
    <div
    onClick={toggleHighlight}
    className={`chat ${currentUser && message.uid === currentUser.uid ? 'chat-start' : 'chat-end'} ${
      isHighlighted ? 'bg-slate-300' : ''
    }`}
  >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="avatar" src={message.avatar || '/default-avatar.png'} />
        </div>
      </div>
      
      <div className="chat-header">
        {message.name || 'Anonymous'}
        {isHighlighted && currentUser && message.uid === currentUser.uid && (
          <button onClick={handleDelete} className="ml-2 text-1xl text-red-700">
            Delete
          </button>
        )}
      </div>

      <div className={`chat-bubble text-white ${getBubbleColor(message.uid)}`}>{message.text}</div>

      
    </div>
  );
};

export default Message;


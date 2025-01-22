import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

function Chatting() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { userId: paramUserId, username } = useParams();
  const [resolvedUserId, setResolvedUserId] = useState(paramUserId || null); // Handle dynamic resolution
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // Fetch the user ID based on username if not already resolved
  const fetchUserId = async () => {
    if (!paramUserId) {
      try {
        const response = await axios.get(`http://localhost:3000/search/${username}`);
        setResolvedUserId(response.data.foundUser._id);
      } catch (error) {
        console.error('Error resolving user ID:', error);
        alert('Unable to find user. Please check the username.');
      }
    }
  };

  // Fetch messages
  const fetchMessages = async () => {
    if (!resolvedUserId) return;
    setLoading(true);
    try {
        console.log(resolvedUserId);
      const response = await axios.get(
        `http://localhost:3000/getMessages?sender=${resolvedUserId}&recipient=${username}`
        
      );
      
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      alert('Failed to fetch messages. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Resolve userId if needed and fetch messages
  useEffect(() => {
    if (!resolvedUserId) {
      fetchUserId();
    } else {
      fetchMessages();
    }
  }, [resolvedUserId, username]);

  // Scroll to the bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !resolvedUserId) return;

    try {
      await axios.post('http://localhost:3000/sendMessage', {
        sender: resolvedUserId,
        recipient: username,
        content: newMessage,
      });
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  // Format the timestamp
  const formatTimestamp = (timestamp) => dayjs(timestamp).fromNow();

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <div className="bg-white p-4 shadow-md">
        <button onClick={() => navigate(`/chats/${paramUserId || resolvedUserId}`)} className="text-blue-500">
          Back to Chats
        </button>
        <h2 className="text-xl font-semibold mt-2">Chat with {username}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {loading ? (
            <p className="text-gray-500">Loading messages...</p>
          ) : messages.length === 0 ? (
            <p className="text-gray-500">No messages yet...</p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg._id}
                className={`flex items-center p-3 rounded-lg ${
                  msg.sender === resolvedUserId ? 'bg-blue-100' : 'bg-gray-100'
                }`}
              >
                <div className="flex-1">
                  <p className="text-gray-700">{msg.content}</p>
                </div>
                <div className="text-xs text-gray-500">{formatTimestamp(msg.timestamp)}</div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 bg-white shadow-md">
        <textarea
          className="w-full p-2 border rounded-lg"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        ></textarea>
        <button
          onClick={handleSendMessage}
          className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatting;

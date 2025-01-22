import React, { useState, useEffect } from 'react';
import Navbar from '../assets/Navbar';
import { AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UserChat() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false); 
  const { userId } = useParams();
  const navigate = useNavigate(); // Hook for navigation

  const currentUser = { userId };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await axios.get(`http://localhost:3000/search/${searchQuery}`);
      setUserData(response.data.foundUser);
      setError('');
    } catch (err) {
      setUserData(null);
      setError('No user found');
    }
  };

  const fetchMessages = async (sender, recipient) => {
    setLoading(true); 
    try {
      const response = await axios.get(
        `http://localhost:3000/getMessages?sender=${sender}&recipient=${recipient}`
      );
      setMessages(response.data.messages);

      if (response.data.messages.length === 0) {
        setChats([]);
      } else {
        setChats(
          response.data.messages.map((msg) => ({
            id: msg._id,
            profilePic: msg.sender === sender ? 'your-profile-pic' : 'other-user-profile-pic',
            username: msg.sender === sender ? 'You' : 'Recipient Username',
            latestMessage: msg.content,
          }))
        );
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchMessages(currentUser.userId, userData._id); 
    }
  }, [userData]);

 
  const redirectToChat = (recipientId, recipientName) => {
    navigate(`/chats/${userId}/${recipientName}`);
  };

  return (
    <div className="h-screen bg-gray-100">
      <Navbar Id={userId} />
      <div className="mt-16 px-4 md:px-8">
        <div className="flex items-center bg-white rounded-lg shadow-md p-2">
          <AiOutlineSearch className="text-gray-500 mx-2" size={24} />
          <input
            type="text"
            placeholder="Search chats"
            className="flex-grow border-none focus:outline-none text-gray-700"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearch} className="ml-2 text-blue-500">
            Search
          </button>
        </div>
        <div className="mt-6 space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          {userData ? (
            <div
              onClick={() => redirectToChat(userData._id, userData.username)} 
              className="flex items-center bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition-all"
            >
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <img
                  src="https://img.freepik.com/free-vector/young-man-avatar-character_24877-9475.jpg"
                  alt={userData.username}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-800">{userData.username}</h3>
                <p className="text-gray-600 text-sm">{userData.story || 'No story available'}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center bg-white p-4 rounded-lg shadow-md animate-pulse">
              <div className="h-12 w-12 rounded-full bg-gray-200"></div>
              <div className="ml-4">
                <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          )}

          <div className="mt-6">
            {loading ? (
              <div className="flex items-center bg-white p-4 rounded-lg shadow-md animate-pulse">
                <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                <div className="ml-4">
                  <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 w-32 bg-gray-200 rounded"></div>
                </div>
              </div>
            ) : chats.length > 0 ? (
              chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => redirectToChat(chat.id, chat.username)}
                  className="flex items-center bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-50 transition-all"
                >
                  <div className="h-12 w-12 rounded-full overflow-hidden">
                    <img
                      src={chat.profilePic}
                      alt={chat.username}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-800">{chat.username}</h3>
                    <p className="text-gray-600 text-sm">{chat.latestMessage}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No chats available.</p> 
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserChat;

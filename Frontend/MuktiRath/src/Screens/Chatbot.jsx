import React, { useState } from 'react';
import Dhruvi from './Dhruvi.png';

function Chatbot() {
  const [messages, setMessages] = useState([]); // Start with an empty messages array
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: input }]);
      setInput(''); // Clear the input field
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-between">
      {/* Chat window */}
      <div className="chatwindow h-full border rounded-lg m-2 p-2 flex flex-col justify-between">

        <div className="flex flex-col gap-2 overflow-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${
                message.sender === 'bot' ? 'self-start bg-teal-100' : 'self-end bg-blue-100'
              } p-2 rounded shadow-md max-w-xs`}
            >
              {message.text}
            </div>
          ))}
        </div>
 
        <div className="h-16 flex items-center rounded-full w-full border p-2 gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow outline-none px-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-emerald-200 shadow-md rounded-full text-zinc-700 border border-zinc-400 hover:bg-teal-600"
          >
            Send
          </button>
        </div>
      </div>

      <div className="flex h-48 border items-end relative">
        <img src={Dhruvi} alt="" className="h-full -mb-1 assistant relative z-50" />
        <div className="h-4/5 border border-zinc-900 shadow-md intro bg-teal-100 w-full rounded relative -ml-8 mr-2 p-4 pl-8">
          <div className="text-xs">
            <p>Hi There I'm Dhruvi, your virtual assistant!</p>
            <p>I'm here to help you with any information you need regarding our content and women empowerment resources.</p>
            <p>Feel free to ask me anything!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;

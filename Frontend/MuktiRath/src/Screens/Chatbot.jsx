import React, { useState } from "react";
import axios from "axios";
import Dhruvi from "./Dhruvi.png";
import GoogleTranslate from "./GoogleTranslate";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const formatMessage = (text) => {
    return text.replace(/\n/g, "<br />").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("https://muktirath-chatserver.onrender.com/suggest", {
        input: input,
      });

      const botMessage = {
        sender: "bot",
        text: formatMessage(response.data.response || "I'm sorry, I didn't understand that."),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Something went wrong. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      handleSend(); 
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <>
      <GoogleTranslate />
      <div className="h-screen w-screen flex flex-col justify-between">
        <div className="chatwindow h-full border rounded-lg m-2 p-2 flex flex-col justify-between">
          <div className="flex flex-col gap-2 overflow-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${
                  message.sender === "bot" ? "self-start bg-teal-100" : "self-end bg-blue-100"
                } p-2 rounded shadow-md max-w-xs mb-4`}
                dangerouslySetInnerHTML={{ __html: message.text }}
              />
            ))}
            {loading && (
              <div className="self-start bg-gray-200 p-2 rounded shadow-md max-w-xs">Typing...</div>
            )}
          </div>

          <div className="h-16 flex items-center rounded-full w-full border p-2 gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-grow outline-none px-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <div className="flex items-center">
              <button
                className="h-8 w-8 rounded-full"
                onClick={handleVoiceInput}
                disabled={isListening}
              >
                {isListening ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    className="h-full scale-150 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM3.5 6.5a.5.5 0 0 1 1 0v1a4 4 0 0 0 8 0v-1a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8v-1a.5.5 0 0 1 .5-.5z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    className="h-full scale-150 text-gray-500 hover:text-zinc-950 transistion-all"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0z" />
                    <path d="M8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3zM3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
                  </svg>
                )}
              </button>

              <button
                onClick={handleSend}
                className="px-4 py-2 bg-emerald-200 shadow-md rounded-full text-zinc-700 border border-zinc-400 hover:bg-teal-600"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex h-48 border items-end relative">
          <img src={Dhruvi} alt="Dhruvi" className="h-full -mb-1 assistant relative z-50" />
          <div className="h-4/5 border border-zinc-900 shadow-md intro bg-teal-100 w-full rounded relative -ml-8 mr-2 p-4 pl-8">
            <div className="text-xs">
              <p>Hi There, I'm Dhruvi, your virtual assistant!</p>
              <p>
                I'm here to help you with any information you need regarding our content and women
                empowerment resources.
              </p>
              <p>Feel free to ask me anything!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chatbot;

"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

const apiKey = "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";

function useChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 0,
      text: "Hello! I'm a chatbot. How can I help you?",
      isUser: false,
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length,
      text: input,
      isUser: true,
    };
    setInput(""); // Clear the input field first
    setMessages([...messages, userMessage]); // Update the messages state

    try {
      // Make the API request after the state has been updated
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [...messages, userMessage].map((message) => ({
            role: "system",
            content: `please eevry content should be related to latrobe university, ${message.text}`,
          })),
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const botMessage = {
        id: messages.length + 1,
        text: response.data.choices[0].message.content,
        isUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return { input, setInput, messages, handleSubmit };
}

export default function Chat() {
  const { input, setInput, messages, handleSubmit } = useChat();

  useEffect(() => {
    // Scroll to the bottom of the chat when new messages are added
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <Header />
      <Main>
        <div
          id="chat-container"
          className="container mx-auto px-4 py-8 min-h-screen relative max-w-3xl flex flex-col justify-between"
        >
          <div className="flex-1 p-4 max-h-screen"
           style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }} // Added styles for scrollbar
           
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-2 ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`prose p-2 rounded-lg ${
                    message.isUser ? "bg-blue-400 text-white" : "bg-gray-200"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex items-center p-4">
            <textarea
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 px-4 py-2 mr-2 border rounded-lg"
            />
            <button
              type="submit"
              className="px-4 py-2 text-white bg-red-500 border rounded-lg hover:bg-red-600"
            >
              Send
            </button>
          </form>
        </div>
      </Main>
      <Footer />
    </>
  );
}

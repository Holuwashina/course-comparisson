"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import { Button, Select, Typography } from "@material-tailwind/react";


function useChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 0,
      text: "Hello! I'm a chatbot. how can I help you to compare courses for latrobe university?",
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
         {/* Hero Section */}
         <div className="bg-red-900 h-[450px] text-center">
          <div className="px-4 py-2 lg:px-44 lg:py-4">
            <div className="pt-10 text-white">
              <h1 className="text-5xl font-extrabold z-10">
              Navigate Your Academic Path
              </h1>
              <h1 className="font-bold z-10 tracking-wider">
              Interact with Our LLM for Latrobe University Course Comparison
              </h1>
              <p className="py-2 z-10">Empower Your Decision-Making Process with Personalized Insights</p>
            </div>
          </div>
        </div>



        <div
          id="chat-container"
          className="container shadow-lg mt-[-10%] mb-5 rounded-md bg-white mx-auto px-4 py-8 min-h-screen relative max-w-4xl flex flex-col justify-between"
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
              rows={5}
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

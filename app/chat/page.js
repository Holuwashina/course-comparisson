"use client";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import { Bar, Line, Radar, Doughnut, PolarArea } from "react-chartjs-2";
import { Children, useEffect, useState } from "react";
import { OpenAI } from "openai"; // Import OpenAI library
import { v4 as uuidv4 } from "uuid"; // Import UUID library for generating unique IDs
import axios from "axios";

const apiKey = "sk-proj-vmXmr626QMmGeXKDPiYET3BlbkFJlQlzmYLykdsZYIu4R68Y";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length,
      text: input,
      isUser: true,
    };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo-instruct",
          prompt: input,
          max_tokens: 50,
          temperature: 0.7,
          stop: "\n",
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
        text: response.data.choices[0].text.trim(),
        isUser: false,
      };
      setMessages([...messages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(messages);

  return (
    <>
      <Header />

      <Main>
        <div className="container mx-auto px-4 py-8 h-full">
          <div className="flex flex-col h-full">
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-2 ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-2 max-w-sm rounded-lg ${
                      message.isUser ? "bg-blue-400 text-white" : "bg-gray-200"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex items-center p-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 px-4 py-2 mr-2 border rounded-lg"
              />
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 border rounded-lg hover:bg-blue-600"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </Main>
      <Footer />
    </>
  );
}

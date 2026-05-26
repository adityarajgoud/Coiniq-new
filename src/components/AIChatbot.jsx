import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { MessageSquare, Send, X, Bot, User, Loader2 } from "lucide-react";
import "../styles/utilities.css";

function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome to COINIQ Intelligence. How can I assist your market analysis today?",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const currentInput = input;

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/ai/chat`,
        {
          prompt: currentInput,
        },
      );

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "System latency detected. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="ai-assistant-container">
      {isOpen && (
        <div className="chat-window-pro">
          <div className="chat-header-pro">
            <div className="header-info">
              <div className="status-dot"></div>
              <span className="font-bold text-gold">COINIQ AI</span>
            </div>

            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="chat-body-pro" ref={scrollRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`chat-bubble ${msg.role}`}>
                <div className="avatar">
                  {msg.role === "assistant" ? (
                    <Bot size={14} />
                  ) : (
                    <User size={14} />
                  )}
                </div>
                <div className="content">{msg.content}</div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-bubble assistant">
                <div className="avatar">
                  <Loader2 size={14} className="spin" />
                </div>
                <div className="content typing">Analyzing market data...</div>
              </div>
            )}
          </div>

          <div className="chat-footer-pro">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about long-term coins..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />

            <button className="send-btn" onClick={handleSend}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <button className="chat-trigger-pro" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>
    </div>
  );
}

export default AIChatbot;

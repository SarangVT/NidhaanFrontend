"use client";
import { useState, useRef, useEffect } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    {
      sender: "assistant",
      text: "Hey! How can I help you?",
      time: new Date(),
    },
  ]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [inputText, setInputText] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const API_BASE_URL = "http://localhost:3001";

  const toggleChat = () => setIsOpen((prev) => !prev);

  const formatTime = (date: Date) => {
    const diff = new Date().getTime() - date.getTime();
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`;
    if (diff < 86400000)
      return `${Math.floor(diff / 3600000)} hour${
        Math.floor(diff / 3600000) > 1 ? "s" : ""
      } ago`;
    return date.toLocaleDateString();
  };

  const addMessage = (
    text: any,
    sender: "user" | "assistant" = "user",
    file: File | null = null,
    isError = false
  ) => {
    const newMessage = { sender, text, file, isError, time: new Date() };
    setMessages((prev) => [...prev, newMessage]);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (file.size > 10 * 1024 * 1024) {
      addMessage(
        "File too large. Maximum size is 10MB.",
        "assistant",
        null,
        true
      );
      return;
    }
    setUploadedFile(file);
  };

  const removeFile = () => setUploadedFile(null);

  const callTextAPI = async (text: string) => {
    const res = await fetch(
      `${API_BASE_URL}/query/?user_input=${encodeURIComponent(text)}`
    );
    return res.ok ? await res.json() : Promise.reject(await res.text());
  };

  const callFileAPI = async (file: File, userQuery = "") => {
    const formData = new FormData();
    formData.append("file", file);
    const url = `${API_BASE_URL}/upload/${
      userQuery ? `?user_query=${encodeURIComponent(userQuery)}` : ""
    }`;
    const res = await fetch(url, { method: "POST", body: formData });
    return res.ok ? await res.json() : Promise.reject(await res.text());
  };

  const sendMessage = async (textOverride?: string) => {
    const currentText = textOverride ?? inputText;
    if ((!currentText && !uploadedFile) || isThinking) return;
    const currentFile = uploadedFile;
    addMessage(currentText, "user", currentFile);
    setInputText("");
    setUploadedFile(null);

    setIsThinking(true);
    try {
      let response;
      if (currentFile && currentText)
        response = await callFileAPI(currentFile, currentText);
      else if (currentFile) response = await callFileAPI(currentFile);
      else response = await callTextAPI(currentText);

      let content = "";
      if (response) {
        if (typeof response.response === "string") content = response.response;
        else if (typeof response.response === "object")
          content = response.response.answer ?? JSON.stringify(response.response);
        else content = JSON.stringify(response);
      }
      addMessage(content, "assistant");
    } catch (err) {
      addMessage("Error sending message: " + err, "assistant", null, true);
    } finally {
      setIsThinking(false);
    }
  };

  const selectSuggestion = (text: string) => sendMessage(text);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !document.getElementById("chatContainer")?.contains(e.target as Node) &&
        !document.getElementById("chatToggleBtn")?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div>
      <button
        id="chatToggleBtn"
        className="fixed bottom-5 right-5 bg-black text-white px-6 py-3 rounded-full z-50 shadow-lg"
        onClick={toggleChat}
      >
        {isOpen ? "✕ Close Chat" : "💬 Chat with Us"}
      </button>

      {isOpen && (
  <div
    id="chatContainer"
    className="fixed bottom-20 right-5 w-[400px] h-[600px] bg-white rounded-xl shadow-lg flex flex-col z-50"
  >
    {/* Chat Body */}
    <div
      className="chat-body flex-1 p-4 overflow-y-auto scrollbar-none"
      ref={chatBodyRef}
    >
      {messages.map((msg, i) => (
        <div key={i} className="flex flex-col mb-4">
          <div
            className={`flex items-start gap-2 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="message-icon w-8 h-8 rounded-full flex items-center justify-center">
              {msg.sender === "user" ? "👨" : "🤖"}
            </div>
            <div
              className={`p-3 rounded-xl max-w-[70%] whitespace-pre-wrap break-words ${
                msg.isError
                  ? "bg-red-100 text-red-800"
                  : msg.sender === "user"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              {msg.sender === "assistant" ? (
                <div dangerouslySetInnerHTML={{ __html: msg.text }} />
              ) : (
                msg.text
              )}
            </div>
          </div>
          <div className="text-xs text-gray-400 mt-1 self-end">
            {formatTime(new Date(msg.time))}
          </div>
        </div>
      ))}

      {isThinking && (
        <div className="flex items-start gap-2 mb-4">
          <div className="w-8 h-8 rounded-full flex items-center justify-center">
            🤖
          </div>
          <div className="p-3 rounded-xl bg-gray-100 text-gray-600 flex items-center gap-2">
            AI is thinking
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce delay-150"></div>
              <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce delay-300"></div>
            </div>
          </div>
        </div>
      )}
    </div>

    {/* Input bar pinned at bottom */}
    <div className="p-4 border-t border-gray-200">
      {uploadedFile && (
        <div className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2">
          <span>📄 {uploadedFile.name}</span>
          <button className="ml-2 text-red-500" onClick={removeFile}>✕</button>
        </div>
      )}
 <div className="flex flex-wrap gap-2 mt-3">
        {["Services", "Appointments", "Plans", "Contact"].map((sugg, idx) => (
          <div
            key={idx}
            className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200 shadow-sm"
            onClick={() =>
              selectSuggestion(
                sugg === "Services"
                  ? "What services do you offer?"
                  : sugg === "Appointments"
                  ? "How can I book an appointment?"
                  : sugg === "Plans"
                  ? "Tell me about your healthcare plans"
                  : "Contact information"
              )
            }
          >
            {sugg}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-3 rounded-full border border-gray-300 focus:border-black outline-none"
          placeholder="Type your message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button
          className="bg-black text-white px-4 py-2 rounded-full"
          onClick={sendMessage}
        >
          ➤
        </button>
      </div>

      {/* Suggestions - permanently pinned */}
    </div>
  </div>
)}
    </div>
  );
};

export default Chatbot;

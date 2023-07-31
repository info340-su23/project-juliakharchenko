/*
import React, { useState, useEffect } from "react";
import ChatBox from "./ChatBox";
import io from "socket.io-client";

const socket = io();

const CommunityPage = () => {
  const [messages, setMessages] = useState([
    { user: "Lyudmila Se", message: "Hello, does anyone know any schools welcoming of Ukrainian refugees?" },
    { user: "Valentin Kh", message: "I've heard the Mercer Island School District is really accommodating for traumatized kids." },
  ]);
  const [messageInput, setMessageInput] = useState("");
  const [myMessages, setMyMessages] = useState([]);

  useEffect(() => {
    socket.on("chatMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, { user: "Other User", message }]);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (messageInput.trim() !== "") {
      socket.emit("chatMessage", messageInput);
      setMyMessages((prevMyMessages) => [...prevMyMessages, { user: "You", message: messageInput }]);
      setMessageInput("");
    }
  };

  return (
    <section className="content-section">
      <div className="container">
        <h2>Community</h2>
        <p>Connect with other refugees and find support in the community:</p>
        <ChatBox messages={[...messages, ...myMessages]} />
        <form className="chat-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="message-input"
            placeholder="Type your message..."
            required
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </section>
  );
};

export default CommunityPage;
*/
import React, { useState, useEffect } from "react";
import ChatBox from "./ChatBox";
import io from "socket.io-client";

const socket = io();

const CommunityPage = () => {
  const [messages, setMessages] = useState({
    school: [
      { user: "Lyudmila Se", message: "Hello, does anyone know any schools welcoming of Ukrainian refugees?" },
      { user: "Valentin Kh", message: "I've heard the Mercer Island School District is really accommodating for traumatized kids." },
    ],
    employment: [
      { user: "Maria P.", message: "Any recommendations for job opportunities in the tech industry?" },
    ],
    healthcare: [
      { user: "Alex K.", message: "Is there a list of healthcare providers that speak Ukrainian or Russian?" },
    ],
  });

  const [messageInput, setMessageInput] = useState("");
  const [selectedSection, setSelectedSection] = useState("school");

  useEffect(() => {
    socket.on("chatMessage", ({ topic, message }) => {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [topic]: [...prevMessages[topic], { user: "Other User", message }],
      }));
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (messageInput.trim() !== "") {
      socket.emit("chatMessage", { topic: selectedSection, message: messageInput });
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedSection]: [...prevMessages[selectedSection], { user: "You", message: messageInput }],
      }));
      setMessageInput("");
    }
  };

  return (
    <section className="content-section">
      <div className="container">
        <h2>Community</h2>
        <p>Click on each specific chat to connect with other refugees and find support in the community:</p>

        <div>
          <hr />
          <button onClick={() => setSelectedSection("school")}>School</button>
          <hr />
          <button onClick={() => setSelectedSection("employment")}>Employment</button>
          <hr />
          <button onClick={() => setSelectedSection("healthcare")}>Healthcare</button>
          <hr />
        </div>

        <div className="chat-section">
          <h3>{selectedSection === "school" ? "School" : selectedSection === "employment" ? "Employment" : "Healthcare"}</h3>
          <ChatBox messages={messages[selectedSection]} />
        </div>

        <form className="chat-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="message-input"
            placeholder={`Type your message for ${selectedSection} chat...`}
            required
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <hr />
          <button type="submit">Send</button>
        </form>
      </div>
    </section>
  );
};

export default CommunityPage;

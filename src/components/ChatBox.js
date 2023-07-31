import React from "react";

const ChatBox = ({ messages }) => {
  return (
    <div className="chatbox">
      {messages.map((msg, index) => (
        <p key={index}>
          <strong>{msg.user}:</strong> {msg.message}
        </p>
      ))}
    </div>
  );
};

export default ChatBox;
import React from "react";
import Message from "./Message";

function Messages({ messages }) {
  return (
    <ul>
      {messages.map((message, i) => (
        <Message message={message} i={i} />
      ))}
    </ul>
  );
}

export default Messages;

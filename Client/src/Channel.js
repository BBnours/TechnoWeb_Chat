import React, { useState } from "react";
import "./App.css";
import MessageForm from "./MessageSend.js";
import Messages from "./Messages.js";
const { DateTime } = require("luxon");

function Channel({ channel }) {
  const [messages, setMessages] = useState([
    {
      author: "Oli",
      creation: DateTime.local(2021, 4, 6, 8, 30),
      content: `Hey`,
    },
    {
      author: "Ayoub",
      creation: DateTime.local(2021, 4, 6, 8, 23),
      content: `Hello`,
    },
    {
      author: "Romain",
      creation: DateTime.local(2021, 4, 6, 8, 24),
      content: `Just Do It`,
    },
    {
      author: "Hugo",
      creation: DateTime.local(2021, 4, 6, 8, 25),
      content: `Ok no problem `,
    },
  ]);

  const addMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
  };

  return (
    <div class="bg-dark" className="channel">
      <div className="messages">
        ----------------------------------------------------------------------
        <h1>Messages for {channel.name}</h1>
        ----------------------------------------------------------------------
        <Messages messages={messages} />
      </div>
      <MessageForm addMessage={addMessage} />
    </div>
  );
}

export default Channel;

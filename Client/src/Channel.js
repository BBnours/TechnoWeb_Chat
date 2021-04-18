import React, { useState, useRef} from "react";
import "./App.css";
import MessageForm from "./MessageSend.js";
import Messages from "./Messages.js";
import axios from 'axios';
const { DateTime } = require("luxon");

function Channel({ channel }) {
  const listRef = useRef();
  const channelId = useRef()
  const [messages, setMessages] = useState([])

  const addMessage = (newMessage) => {
    fetchMessages()
  }
  const fetchMessages = async () => {
    setMessages([])
    const {data: messages} = await axios.get(`http://localhost:8000/api/v1/channels/${channel.id}/messages`)
    setMessages(messages)
    if(listRef.current){
      listRef.current.scroll()
    }
  }
  if(channelId.current !== channel.id){
    fetchMessages()
    channelId.current = channel.id
  }

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

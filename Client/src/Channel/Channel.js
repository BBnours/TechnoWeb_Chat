import React, { useState, useRef} from "react";
import "../Style/App.css";
import MessageForm from "../Message/MessageSend.js";
import Paper from '@material-ui/core/Paper';
import Messages from "../Message/Messages.js";
import { createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios';


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
    <Paper  className="channel">
      <div className="messages">
        ----------------------------------------------------------------------
        <h1>Messages for {channel.name}</h1>
        ----------------------------------------------------------------------
        <Messages messages={messages} />
      </div>
      <MessageForm addMessage={addMessage} />
    </Paper>
  );
}

export default Channel;

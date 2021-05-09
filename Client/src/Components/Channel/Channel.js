import React, { useState, useRef} from "react";
import "../../Style/App.css";
import MessageForm from "../Message/MessageSend.js";
import Paper from '@material-ui/core/Paper';
import Messages from "../Message/Messages.js";
import axios from 'axios';
import authHeader from "../../Services/AuthHeader";


function Channel({ channel }) {

  const channelId = useRef()
  const [messages, setMessages] = useState([])


  const addMessage = (newMessage) => {
    fetchMessages()
  }
  const fetchMessages = async () => {
    setMessages([])
    const {data: messages} = await axios.get(`http://localhost:8000/api/v1/channels/${channel.id}/messages`,  { headers: authHeader() })
    setMessages(messages)
  }
  
  if(channelId.current !== channel.id){
    fetchMessages()
    channelId.current = channel.id
  }



  return (
    <Paper elevation={3} style={{ 
      height: '80vh',
      flex: '1 1 auto',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflowX: 'auto'
    }}>
      
      
      <div className="messages">
        ----------------------------------------------------------------------
        <h1>Messages for {channel.name}</h1>
        ----------------------------------------------------------------------
        <Messages messages={messages} channel={channel} fetchMessages={fetchMessages}/>
      </div>
      <div style={{ position: 'sticky',bottom: '0'}}>
      <MessageForm addMessage={addMessage} channel={channel}   />
      </div>
    </Paper>
  );
}

export default Channel;

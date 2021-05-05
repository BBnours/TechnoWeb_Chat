import React, { useState, useRef} from "react";
import "../Style/App.css";
import MessageForm from "../Message/MessageSend.js";
import Paper from '@material-ui/core/Paper';
import Messages from "../Message/Messages.js";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import { Typography, AppBar, Container, Toolbar } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';



const useStyles = (theme) => ({
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflowX: 'auto',
  },
})


function Channel({ channel }) {

  const listRef = useRef();
  const channelId = useRef()
  const [messages, setMessages] = useState([])
  const [scrollDown, setScrollDown] = useState(false)


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


  const onScrollDown = (scrollDown) => {
    setScrollDown(scrollDown)
  }
  const onClickScroll = () => {
    listRef.current.scroll()
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
        <Messages messages={messages} channel={channel}
        onScrollDown={onScrollDown}
        ref={listRef}/>
      </div>
      <div style={{ position: 'sticky',bottom: '0',width: '295px'}}>
      <MessageForm addMessage={addMessage} channel={channel}   />
      </div>
    </Paper>
  );
}

export default Channel;

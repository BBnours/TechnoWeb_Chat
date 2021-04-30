import React from "react";
import Message from "./Message";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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

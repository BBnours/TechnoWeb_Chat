import React from "react";
import Message from "./Message";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { useState } from "react";
const { DateTime } = require("luxon");

function Messages({ messages }) {
  const [date, datePass] = useState([]);

  const addDate = (Newdate) => {
    datePass([...date, Newdate]);
  };

  const uniqueTags = [];
  const unique = [];
  messages.map((msg) => {
    if (uniqueTags.indexOf(DateTime.fromISO(msg.created_at).toFormat("dd/MM")) === -1) {
      uniqueTags.push(DateTime.fromISO(msg.created_at).toFormat("dd/MM"));
    }
  });

  function compare(a, b) {
    if (a.created_at < b.created_at) {
      return -1;
    }
    if (a.created_at > b.created_at) {
      return 1;
    }
    return 0;
  }

  messages.sort(compare);

  return (
    <div>
      {uniqueTags.map((msg) => (
          <div>
            <span> {msg} </span>

            {messages.map((message, i) => {
              if(msg== DateTime.fromISO(message.created_at).toFormat("dd/MM"))
                  return (
                      <ul>
                        <Message message={message} i={i} />
                      </ul>
                  )
            })}
          </div>
        )
      )}
    </div>
  );
}

export default Messages;

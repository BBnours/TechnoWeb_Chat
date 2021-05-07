import React from "react";
import Message from "./Message"
import Card from '@material-ui/core/Card';
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const { DateTime } = require("luxon");

const useStyles = makeStyles((theme) => ({
  dateCard: {
    position:'relative',
    display: 'flex',
    justifyContent: 'center',
  },
}));


function Messages({ messages , channel, fetchMessages}) {
  const classes = useStyles();
  const [date, datePass] = useState([]);

  const addDate = (Newdate) => {
    datePass([...date, Newdate]);
  };

  const uniqueTags = [];
  messages.map((msg) => {
    if (uniqueTags.indexOf(DateTime.fromISO(msg.created_at).toFormat("dd MM yyyy")) === -1) {
      uniqueTags.push(DateTime.fromISO(msg.created_at).toFormat("dd MM yyyy"));
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
      {uniqueTags.map((msg,k) => (
          <div key={k}>
            <Card className={classes.dateCard} > -- {msg} -- </Card>
            <ul>
            {messages.map((message, i) => {
              if(msg== DateTime.fromISO(message.created_at).toFormat("dd MM yyyy"))
                  return (
                      
                        <Message key={i} message={message} i={i} channel={channel} fetchMessages={fetchMessages} />
                      
                  )
            })}
            </ul>
          </div>
        )
      )}
    </div>
  );
}

export default Messages;

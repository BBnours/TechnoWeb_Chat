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


function Messages({ messages }) {
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
      {uniqueTags.map((msg) => (
          <div>
            <Card className={classes.dateCard} > -- {msg} -- </Card>

            {messages.map((message, i) => {
              if(msg== DateTime.fromISO(message.created_at).toFormat("dd MM yyyy"))
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

import React, { useState, useCallback } from "react";
import "../Style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdSend } from "react-icons/md";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  Send: {
    backgroundColor: theme.palette.secondary.main
  },
}));

function MessageForm({ addMessage, channel }) {
  const classes = useStyles();
  const [content, setContent] = useState("");
  

  const onSubmit = async (e) => {
    const {data: message} = await axios.post(
      `http://localhost:8000/api/v1/channels/${channel.id}/messages`
    , {
      content: content,
      userId: 'Oli',
    })
    addMessage(message)
    setContent('')
  }

  const onChange = useCallback(
    (e) => {
      setContent(e.target.value);
    },
    [setContent]
  );

  return (
    <form novalidate>
    <div className="form">
    <TextField
        id="outlined-multiline-flexible"
        label="Message"
        multiline
        rowsMax={4}
        value={content}
        onChange={onChange}
        variant="outlined"
        className="content"
      />
      <Button
        variant="contained"
        color="secopndary"
        onClick={(e) => {
          e.preventDefault();
          onSubmit();}}
      >
        <MdSend />
      </Button>
    </div>
    </form>
  );
}

export default MessageForm;

import React, { useState, useCallback } from "react";
import "../Style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { MdSend } from "react-icons/md";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
const { DateTime } = require("luxon");

function MessageForm({ addMessage, channel }) {
  const [content, setContent] = useState("");

  const onSubmit = async () => {
    const {data: message} = await axios.post(
      `http://localhost:8000/api/v1/channels/${channel.id}/messages`
    , {
      content: content,
      userId: 'Oli',
      created_at: DateTime.now().setZone("local"),
      
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
    <form  onSubmit={onSubmit} noValidate>
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
        type="submit"
        class="btn btn-default btn-sm"
      >
        <MdSend />
      </Button>
    </div>
    </form>
  );
}

export default MessageForm;

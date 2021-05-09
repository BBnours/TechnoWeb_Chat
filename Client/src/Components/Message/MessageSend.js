import React, { useState, useCallback } from "react";
import "../../Style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdSend } from "react-icons/md";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import axios from 'axios';
import authHeader from "../../Services/auth-header";
import AuthService from "../../Services/auth.service";



function MessageForm({ addMessage, channel }) {
  const [content, setContent] = useState("");
  
  const currentUser = AuthService.getCurrentUser();

  const onSubmit = async (e) => {
    const {data: message} = await axios.post(
      `http://localhost:8000/api/v1/channels/${channel.id}/messages`
    , {
      content: content,
      userId: currentUser.user.id,
    }, { headers: authHeader() })
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
    <form noValidate>
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
        color="secondary"
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

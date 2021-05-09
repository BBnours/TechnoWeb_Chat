import React from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import "../../Style/App.css";
import "../../Style/message.css";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import { MdSend } from "react-icons/md";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { MdCreate, MdDelete } from "react-icons/md";
import IconButton from "@material-ui/core/IconButton";
import authHeader from "../../Services/auth-header";
import AuthService from "../../Services/auth.service";
import Gravatar from 'react-gravatar'
const nl2br = require("react-nl2br");

const useStyles = makeStyles((theme) => ({
  bubble: {
    borderRadius: ".4em",
    display: "inline-block",
    maxWidth: "50vw",
    overflowWrap: "break-word",
    padding: "10px",
    backgroundColor: theme.palette.primary.main,
  },

  bubbleRight: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

function Message({ message, i, fetchMessages }) {
  const classes = useStyles();
  const [showModif, setShowModif] = React.useState(false);
  const onClickModif = () => setShowModif(true);
  const wrapperRef = useRef();
  const [content, setContent] = useState("");
  const [user, setUser] = useState("");
  const [isOwner, setOwner] = useState(true);
  

  const onChange = useCallback(
    (e) => {
      setContent(e.target.value);
    },
    [setContent]
  );

  const handleClickOutside = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setShowModif(false);
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/api/v1/users/${message.userId}`, { headers: authHeader() })
    .then(response => setUser(response.data));;
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  const onDelete = async () => {
    await axios.delete(`http://localhost:8000/api/v1/messages/${message.id}`, { headers: authHeader() });
    fetchMessages();
  };

  const onModify = async () => {
    await axios.put(`http://localhost:8000/api/v1/messages/${message.id}`, 
    { 
      content: content ,
    }, { headers: authHeader() });
    fetchMessages();
    setContent('');
  };

  const currentUser = AuthService.getCurrentUser();
  function lookOwner(e) {
    if(currentUser.user.id=== message.userId)
      setOwner(true);
    else setOwner(false);
  }

  return (
    <div id="messageDiv" key={i} onMouseOver={lookOwner}>
      <Gravatar email={currentUser.user.email}/>
      <div
        style={{ display: "flex", flexDirection: "column", padding: "10px" }}
      >
        <span>{user.name}</span>
        <li>
          <Card className={classes.bubble}>
            <span style={{ color: "black" }}>
              {nl2br(" " + message.content)}
            </span>
          </Card>
        </li>
      </div>
      {isOwner ?(
        <div>
      <IconButton
        className="mdHover"
        variant="contained"
        color="secondary"
        onClick={(e) => {
          e.preventDefault();
          onClickModif();
        }}
      >
        {showModif ? (
          <form ref={wrapperRef}>
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
                  onModify();
                }}
              >
                <MdSend />
              </Button>
            </div>
          </form>
        ) : null}
        <MdCreate className="mdHover" />
      </IconButton>
      <IconButton
        className="mdHover"
        variant="contained"
        color="secondary"
        onClick={(e) => {
          e.preventDefault();
          onDelete();
        }}
      >
        <MdDelete className="mdHover" />
      </IconButton>
      </div>
      ) : null}
    </div>
  );
}

export default Message;

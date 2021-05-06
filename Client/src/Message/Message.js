import React from "react";
import "../Style/App.css";
import "../Style/message.css";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import { MdCreate, MdDelete } from "react-icons/md";
import IconButton from '@material-ui/core/IconButton';

const nl2br = require("react-nl2br");

const useStyles = makeStyles((theme) => ({
  bubble: {
    borderRadius: ".4em",
    display: "inline-block",
    maxWidth: '50vw',
    overflowWrap: "break-word",
    padding: "10px",
    backgroundColor: theme.palette.primary.main,
  },

  bubbleRight: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));



function Message({ message, i, fetchMessages}) {
  const classes = useStyles();

  const onDelete = async () => {
    await axios.delete(
      `http://localhost:8000/api/v1/messages/${message.id}`)
      fetchMessages()
  }


  return (
    <div id="messageDiv" key={i} >
        <Avatar style={{marginBottom: 0}}>O</Avatar>
        <div style= {{ display: "flex", flexDirection: "column", padding: "10px" }} >
          <span style={{ color: "whitesmoke" }}>
            {message.userId}
          </span>
          <li key={i}>
            <Card className={classes.bubble}>
              <span style={{ color: "black" }}>
                {nl2br(" " + message.content)}
              </span>
            </Card>
          </li>
          
        </div>
        <IconButton 
        className="mdHover"
        variant="contained"
        color="secondary"
        onClick={(e) => {
        e.preventDefault();
        }}
      >
        <MdCreate className="mdHover"/>
        </IconButton >
        <IconButton 
        className="mdHover"
        variant="contained"
        color="secondary"
        onClick={(e) => {
          e.preventDefault();
          onDelete();}}
      >
        <MdDelete className="mdHover"/>
        </IconButton >
      </div>
      
  );
}

export default Message;

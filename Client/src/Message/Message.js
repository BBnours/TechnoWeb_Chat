import React from "react";
import "../Style/App.css";
import "../Style/message.css";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useRef, useEffect } from "react";

const { DateTime } = require("luxon");

const nl2br = require("react-nl2br");

const useStyles = makeStyles((theme) => ({
  bubble: {
    position: "relative",
    borderRadius: ".4em",
    display: "inline-block",
    padding: "10px",
    backgroundColor: theme.palette.primary.main,
  },
}));

function Message({ message, i}) {
  const classes = useStyles();

  return (
    <div key={i}>
      <span style={{ color: "whitesmoke" }}>{message.userId}</span>{" "}

      <li key={i}>
        <p className={`${classes.bubble} ${classes.speech}`}>
          <span style={{ color: "black" }}> ~</span>
          <span style={{ color: "black" }}>{nl2br(" " + message.content)}</span>
        </p>
      </li>{" "}
      
     
    </div>
  );
}

export default Message;
/*<span style={{  color: "whitesmoke" }}>
            {DateTime.fromISO(message.created_at).toFormat("HH:mm")}
          </span>*/
import React from "react";
import "../Style/App.css";
import "../Style/message.css";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const nl2br = require("react-nl2br");

const useStyles = makeStyles((theme) => ({
  bubble: {
    borderRadius: ".4em",
    display: "inline-block",
    maxWidth: "60%",
    overflowWrap: "break-word",
    padding: "10px",
    backgroundColor: theme.palette.primary.main,
  },

  bubbleRight: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

function Message({ message, i }) {
  const classes = useStyles();

  return (
    <div key={i} style={{ display: "flex", flexDirection: "row", padding: "10px" }}>
        <Avatar style={{position: 'bottom'}}>O</Avatar>
        <div >
          <span style={{ color: "whitesmoke" }}>
            {message.userId}
          </span>
          <li key={i}>
            <p className={`${classes.bubble} ${classes.speech}`}>
              <span style={{ color: "black" }}>
                {nl2br(" " + message.content)}
              </span>
            </p>
          </li>{" "}
        </div>
      </div>
  );
}

export default Message;

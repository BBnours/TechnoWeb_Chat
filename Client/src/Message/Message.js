import React from "react";
import "../Style/App.css";
import "../Style/message.css";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";

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

function Message({ message, i }) {
  const classes = useStyles();

  return (
    <div key={i} style={{flex : "1 1 auto " ,display: "flex", flexDirection: "row", padding: "10px" }}>
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
          {" "}
        </div>
      </div>
  );
}

export default Message;

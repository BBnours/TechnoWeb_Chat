import React from "react";
import "./App.css";

const nl2br = require("react-nl2br");

//{moment(message.creation).format('LLL')}

function Message({ message, i }) {
  return (
    <li key={i}>
      <p>
        <span style={{ color: "green" }}>{message.userId}</span>{" "}
        <span style={{ color: "#ff007f" }}>
          {message.created_at}
        </span>
        <span style={{ color: "#ffff00" }}> ~</span>
        <span style={{ color: "whitesmoke" }}>
          {nl2br(" " + message.content)}
        </span>
      </p>
    </li>
  );
}

export default Message;

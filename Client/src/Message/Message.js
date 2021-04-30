import React from "react";
import "../Style/App.css";
const { DateTime } = require("luxon");

const nl2br = require("react-nl2br");

//{moment(message.creation).format('LLL')}

function Message({ message, i }) {
  return (
    <li key={i}>
      <p>
        <span style={{ color: "green" }}>{message.userId}</span>{" "}
        <span style={{ color: "#ff007f" }}>
          {(message.created_at).toLocaleString(DateTime.DATETIME_MED)}
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

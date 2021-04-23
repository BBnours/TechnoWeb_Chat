import React, { useState, useCallback } from "react";
import "../Style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { MdSend } from "react-icons/md";
const { DateTime } = require("luxon");

function MessageForm({ addMessage }) {
  const [content, setContent] = useState("");

  const onSubmit = useCallback(
    (e) => {
      if (content) {
        addMessage({
          content,
          author: "Oli",
          creation: DateTime.now().setZone("local"),
        });
      }

      setContent("");
    },
    [addMessage, content, setContent]
  );

  const onChange = useCallback(
    (e) => {
      setContent(e.target.value);
    },
    [setContent]
  );

  return (
    <div className="form">
      <input
        class="form-control"
        type="text"
        placeholder="Write here…"
        className="content"
        onChange={onChange}
        name="content"
        rows={5}
        value={content}
      />
      <Button
        onClick={onSubmit}
        type="submit"
        variant="success"
        class="btn btn-default btn-sm"
      >
        <MdSend />
      </Button>
    </div>
  );
}

export default MessageForm;

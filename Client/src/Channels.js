import React from "react";
import "./App.css";
import Button from "react-bootstrap/Button";

function Channels(props) {
  const channels = props.channels;
  return (
    <div
      class="bg-dark col-xl-2 col-md-3 col-12 SideNav-SidePanel-module--cls2--1PH6H 
        SideNav-SidePanel-module--cls1--34IFY d-flex flex-column"
    >
      {channels.map((channel, i) =>
        channel.name === "Fake channel" ? (
          <Button
            type="Submit"
            variant="dark"
            style={{ borderColor: "#ff007f" }}
            key={i}
          >
            {channel.name}
          </Button>
        ) : (
          <Button type="Submit" variant="dark" key={i}>
            {channel.name}
          </Button>
        )
      )}
    </div>
  );
}

export default Channels;

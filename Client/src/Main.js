import React from "react";
import Channels from "./Channels.js";
import Channel from "./Channel.js";

const styles = {
  main: {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
  },
};

function Main() {
  const channels = [
    {
      name: "Fake channel",
    },
    {
      name: "White Hat",
    },
    {
      name: "Red Hat not Linux",
    },
    {
      name: "Black Hat",
    },
  ];

  return (
    <main className="app-main" style={styles.main}>
      <Channels channels={channels} />
      <Channel channel={channels[0]} />
    </main>
  );
}

export default Main;

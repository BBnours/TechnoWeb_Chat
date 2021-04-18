import React from "react";
import {useRef, useState} from 'react';
import Channels from "./Channels.js";
import Channel from "./Channel.js";
import Intro from "./Intro"


const styles = {
  main: {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
  },
};

function Main() {
  const [channel, setChannel] = useState(null)
  const fetchChannel = async (channel) => {
    setChannel(channel)
  }

  return (
    <main className="app-main" style={styles.main}>
      <Channels onChannel={fetchChannel} />
      {channel ? <Channel channel={channel} messages={[]} /> : <Intro />}
    </main>
  );
}

export default Main;

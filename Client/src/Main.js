import React from "react";
import {useRef, useState} from 'react';
import Channels from "./Channel/Channels.js";
import Channel from "./Channel/Channel.js";
import Intro from "./Structure/Intro";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Toolbar } from '@material-ui/core';



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
    <Paper >
    <main className="app-main" style={styles.main}>
      <Channels onChannel={fetchChannel} />
      {channel ? <Channel channel={channel} messages={[]} /> : <Intro />}
    </main>
    </Paper>
  );
}

export default Main;

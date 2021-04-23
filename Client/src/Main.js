import React from "react";
import {useRef, useState} from 'react';
import Channels from "./Channel/Channels.js";
import Channel from "./Channel/Channel.js";
import Intro from "./Structure/Intro"
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


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

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  return (
    <ThemeProvider  theme={darkTheme}>
    <main className="app" style={styles.main} class="bg-warning">
      <Channels onChannel={fetchChannel} />
      {channel ? <Channel channel={channel} messages={[]} /> : <Intro />}
    </main></ThemeProvider>
  );
}

export default Main;

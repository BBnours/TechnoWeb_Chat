import React from "react";
import { useState, useEffect } from "react";
import "../../Style/App.css";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Typography } from "@material-ui/core";
import ChannelForm from "./ChannelForm.js"
import authHeader from "../../Services/AuthHeader";
import ChannelInviteForm from "./ChannelInviteForm";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
    width: 250,
    height: "85vh",
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    overflow: 'auto',
    scrollbarWidth: 'thin',
  scrollbarColor: 'blue orange',
  },

  notactive: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
  },
  active: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

function Channels({ onChannel }) {
  useEffect(()=>{
    fetchChannels()
  }, []) 
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [all_channels, setChannels] = useState([]);

  const addChannel = (newChann) => {
    fetchChannels()
  }

  function handleMenuItemClick(index) {
    setSelectedIndex(index);
  }

  const fetchChannels = async () => {
    setChannels([]);
    const {data: channels} = await axios.get(`http://localhost:8000/api/v1/channels/`, { headers: authHeader() })
    setChannels(channels)
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h6">Channels </Typography>
        <MenuList>
          {all_channels.map((channel, i) => (
            <MenuItem
              key={i}
              onClick={(e) => {
                e.preventDefault();
                onChannel(channel);
                handleMenuItemClick(i);
              }}
              className={
                selectedIndex === i ? classes.active : classes.notactive
              }
            >
              {channel.name}
              <div  style={{marginLeft: 'auto', marginRight: 0}}>
              <ChannelInviteForm Currentchannel= {channel}/>
              </div>
            </MenuItem>
          ))}
        </MenuList>

        <ChannelForm addChannel = {addChannel}/>
      </Paper>
    </div>
  );
}

export default Channels;

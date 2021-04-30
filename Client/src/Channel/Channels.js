import React from "react";
import {useState,useEffect} from "react"
import "../Style/App.css";
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
    width: 200,
    height: '85vh',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
  },
  
  notactive: {
      '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.main,
      }
  },
  active: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
      '&:hover': {
        color: theme.palette.primary.main
      }
  },
  
}));



function Channels({onChannel}) {

  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(1);

  function handleMenuItemClick(index) {
    setSelectedIndex(index);
  }


  const [all_channels, setChannels] = useState([]);
  useEffect( () => {
    const fetch = async () => {
      const {data : all} = await axios.get('http://localhost:8000/api/v1/channels');
      setChannels(all);
    }
    fetch()
  }, []);

  return (

    <div  className={classes.root}>
      <Paper className={classes.paper} elevation={3} >
        <MenuList>
        { all_channels.map( (channel, i) => (
        <MenuItem key={i} 
            onClick={ (e) => {
              e.preventDefault()
              onChannel(channel)
              handleMenuItemClick(i)
            }}
            className={selectedIndex === i ? classes.active : classes.notactive }
            >
            {channel.name}
        </MenuItem>
      ))}
        </MenuList>
        
      </Paper>
    </div>
    

  );
}

export default Channels;

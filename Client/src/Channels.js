import React from "react";
import {useState,useEffect} from "react"
import "./App.css";
import { jsx } from '@emotion/react'
import Link from '@material-ui/core/Link'
import Button from "react-bootstrap/Button";
import axios from 'axios';


const getChannels = async () => {
  try {
    return axios.get('http://localhost:8000/api/v1/channels');
  } catch (error) {
    console.error(error)
  }
}

function Channels({onChannel}) {

  const [all_channels, setChannels] = useState([]);
  useEffect( () => {
    const fetch = async () => {
      const {data : all} = await axios.get('http://localhost:8000/api/v1/channels');
      setChannels(all);
    }
    fetch()
  }, []);

  return (
    <ul class="bg-dark col-xl-2 col-md-3 col-12 SideNav-SidePanel-module--cls2--1PH6H 
    SideNav-SidePanel-module--cls1--34IFY d-flex flex-column">
      { all_channels.map( (channel, i) => (
        
        <li key={i} >
          <Button
            href="#"
            onClick={ (e) => {
              e.preventDefault()
              onChannel(channel)
            }}
            >
            {channel.name}
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default Channels;

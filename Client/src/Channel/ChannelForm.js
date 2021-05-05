import React from 'react';
import { useState, useCallback } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

function ChannelForm({addChannel}) {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = useState("");

  const onSubmit = async () => {
    const {data: channel} = await axios.post(
      `http://localhost:8000/api/v1/channels/`
    , {
      name :content,
        })

        handleClose()
        addChannel(channel)
        setContent('')
  }
  const onChange = useCallback(
    (e) => {
      setContent(e.target.value);
    },
    [setContent]
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        New Channel
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Channel</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a New channel, please enter a name.
          </DialogContentText>
          <TextField
            autoFocus
            onChange={onChange}
            id="name"
            label="Channel Name"
            value={content}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default ChannelForm;
import React from 'react';
import { useState} from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormHelperText from '@material-ui/core/FormHelperText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import authHeader from "../../Services/auth-header";
import AuthService from "../../Services/auth.service";
import { MdPersonAdd } from "react-icons/md";

function ChannelInviteForm({Currentchannel}) {
  const [open, setOpen] = React.useState(false);
  const currentUser = AuthService.getCurrentUser();
  const [allValues, setAllValues] = useState({
    members : '' ,
 });

  const onSubmit = async () => {

      const {data: users} = await axios.get(
        `http://localhost:8000/api/v1/users/`, { headers: authHeader() })

        const mails = allValues.members.split(/(?:;,| )+/);

        var memberRequests = []

        users.map((user, i) => { 
        if(mails.includes(user.email)) 
          memberRequests.push(user.id);
        })
        
        memberRequests.push(currentUser.user.id);

        const newMembers = [...Currentchannel.membership, ...memberRequests] 

    await axios.put(
      `http://localhost:8000/api/v1/channels/${Currentchannel.id}`
    , {
        name : Currentchannel.name,
      membership : newMembers
        }, { headers: authHeader() })

        handleClose()
      

        setAllValues( prevValues => {
          return {
            members : '',
         }})
        }

        const onChange = async (e) => {
          setAllValues( prevValues => {
            return { ...prevValues,[e.target.name]: e.target.value}
          })
        };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} >
                <MdPersonAdd />
        </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Friends</DialogTitle>
        <DialogContent style={{display:'flex', flexDirection:'column'}}>
          <DialogContentText>
            Here ! Add some more Friends !
          </DialogContentText>
          <TextField
            onChange={onChange}
            name="members"
            label="Members"
            value= {allValues.members}
          />
          <FormHelperText>Add your friends' mail seperated with ';'</FormHelperText>
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


export default ChannelInviteForm;
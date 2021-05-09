import React, {useEffect, useState} from "react";
import "../Style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdSettings } from "react-icons/md";
import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Switch from "@material-ui/core/Switch";
import {
  Grid,
  Card,
  Typography,
  Button,
  TextField,
  NativeSelect,
  FormControl,
  FormHelperText,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import AuthService from "../Services/auth.service";
import authHeader from "../Services/auth-header";
import {useHistory} from "react-router-dom";

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
  },
  checked: {},
}))(Switch);

const useStyles = makeStyles((theme) => ({
  backgroundC: {
    height: "100vh",
    width: "100%",
  },
  Textcolor: {
    color: theme.palette.third.main,
    paddingLeft: 100,
  },
  color: {
    backgroundColor: theme.palette.secondary.main,
  },
  type: true,
}));

function Settings() {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState(true);
  const [allValues, setAllValues] = useState({
    nom: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (window.localStorage.getItem("theme") === "light") setState(true);
    else setState(false);
  }, []);

  function refreshPage() {
    window.location.reload(false);
  }

  const handleChecked = (e) => {
    if (e.target.checked) {
      setState(true);
      window.localStorage.setItem("theme", "light");
    } else {
      setState(false);
      window.localStorage.setItem("theme", "dark");
    }
    refreshPage();
  };

  const changeHandler = e => {
    setAllValues({...allValues, [e.target.name]: e.target.value})
  }

  const currentUser = AuthService.getCurrentUser()

  const updateUser = async () => {
    if (allValues.email != '' || allValues.nom != '' || allValues.password != '') {
      const {data: user} = await axios.put(
          `http://localhost:8000/api/v1/users/${currentUser.user.id}`
          , {
            name: allValues.nom,
            email: allValues.email,
            password: allValues.password,
          }, { headers: authHeader() })
      setAllValues({
        nom: '',
        email: '',
        password: ''
      })
      refreshPage();
    }
  }

  const backTchat = async () => {
    history.push("/app");
  }

  return (
    <Card className={classes.backgroundC}>
      <Typography variant="h2">
        Settings
      </Typography>
      <Card className="cardSetting">
        <Card variant="outlined" className="settingInfo">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
                placeholder="Username"
                name="nom"
                id="nom"
                type="text"
                onChange={changeHandler}
            ></TextField>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
                placeholder="Email"
                name="email"
                id="email"
                type="text"
                onChange={changeHandler}
            ></TextField>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
                placeholder="Password"
                name="password"
                id="password"
                type="password"
                onChange={changeHandler} ></TextField>
          </div>
          <Button style={{margin: '0 auto', display: "flex"}}
              variant="contained"
              color="secondary"
              onClick= {updateUser}>Update
          </Button>
        </Card>

        <Card variant="outlined" className="settingInfo">
          <div style={{ display: "flex", flexDirection: "column" }}>
            UI theme :
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>Dark</Grid>
              <Grid item>
                <AntSwitch checked={state} onChange={handleChecked} />
              </Grid>
              <Grid item>Light</Grid>
            </Grid>
          </div>
        </Card>
        <div style={{ display: "flex", flexDirection: "column" }}>
          Language preference :
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-helper">Language</InputLabel>
            <NativeSelect>
              <option aria-label="None" value="" />
              <option value={10}>French</option>
              <option value={20}>English</option>
              <option value={30}>Portuguese</option>
            </NativeSelect>
            <FormHelperText>This function is currently disabled</FormHelperText>
          </FormControl>
        </div>
      </Card>
      <Button
          variant="contained"
          color="secondary"
          onClick= {backTchat}>Back
      </Button>
    </Card>
  );
}

export default Settings;

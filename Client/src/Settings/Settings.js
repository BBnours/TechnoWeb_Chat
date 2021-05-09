import React, {useEffect, useState} from "react";
import "../Style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { withStyles } from "@material-ui/core/styles";
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
import AuthService from "../Services/Auth";
import authHeader from "../Services/AuthHeader";
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
  const [state, setState] = useState(true);
  const [allValues, setAllValues] = useState({
    nom: '',
    src: ''
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
    if (allValues.nom !== ''  && allValues.src !== '') {
      await axios.put(
          `http://localhost:8000/api/v1/users/${currentUser.user.id}`
          , {
            name: allValues.nom,
            email: currentUser.user.email,
            password: currentUser.user.password,
            src: allValues.src,
          }, { headers: authHeader() })
      setAllValues({
        nom: '',
        src: ''
      })
      refreshPage();
    }
  }

  const backTchat = async () => {
    history.push("/app");
  }

  const deku = './icone_deku.png';
  const kirua = './icone_kirua.png';
  const fille = './icone_tsunade.png';

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
            <InputLabel>Choix image</InputLabel>
            <NativeSelect
                name="src"
                id="src"
                onChange={changeHandler}>
              <option
                  aria-label="None"
                  value="" />
              <option
                  value={deku}
              >Deku</option>
              <option
                  value={kirua}>Kirua
              </option>
              <option
                  value={fille}
              >Tsunade</option>
            </NativeSelect>
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
          <FormControl >
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

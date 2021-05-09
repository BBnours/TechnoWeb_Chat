import React, { useEffect } from "react";
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

  const [state, setState] = React.useState(true);

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

  return (
    <Card className={classes.backgroundC}>
      <Typography variant="h2">
        Settings
      </Typography>
      <Card className="cardSetting">
        <Card variant="outlined" className="settingInfo">
          <div style={{ display: "flex", flexDirection: "column" }}>
            Modify Username :<TextField label="New Username"></TextField>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            Modify Email
            <TextField label="New Email :" ></TextField>
          </div>
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
    </Card>
  );
}

export default Settings;

import React from "react";
import "./Style/App.css";
import Footer from "./Structure/Footer.js";
import Header from "./Structure/Header.js";
import Main from "./Main.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import { Typography, AppBar, Container, Toolbar } from '@material-ui/core';
import themeBuilder from "./Style/Theme/themeProvider"
import CssBaseline from '@material-ui/core/CssBaseline';


const styles = {
  root: {
    boxSizing: "border-box",
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
  },
};



export default () => (
  <ThemeProvider theme={themeBuilder()}>
    <CssBaseline/>
  <div className="app" style={styles.root}>
    <Header/>
    <Main />
    <Footer/>
  </div>
  </ThemeProvider>
  
);

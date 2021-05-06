import React from "react";
import "./Style/App.css";
import Footer from "./Structure/Footer.js";
import Header from "./Structure/Header.js";
import Main from "./Main.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from '@material-ui/core/styles';
import themeBuilder from "./Style/Theme/themeProvider"
import CssBaseline from '@material-ui/core/CssBaseline';

function handleScroll (e) {
  if (e.target.classList && e.target.classList.contains("on-scrollbar") === false) {
      e.target.classList.add("on-scrollbar");
  }
}

const styles = {
  root: {
    boxSizing: "border-box",
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
  },
};


window.addEventListener('scroll', handleScroll, true);



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

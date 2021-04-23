import React from "react";
import "./Style/App.css";
import Footer from "./Structure/Footer.js";
import Header from "./Structure/Header.js";
import Main from "./Main.js";
import Container from '@material-ui/core/Container';
import "bootstrap/dist/css/bootstrap.min.css";

const styles = {
  root: {
    backgroundColor: "black",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
  },
};

export default () => (
  
  <div className="app" style={styles.root}>
    <Header />
    <Main />
    <Footer />
  </div>
  
);

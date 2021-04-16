import React from "react";
import "./App.css";
import Footer from "./Footer.js";
import Header from "./Header.js";
import Main from "./Main.js";
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

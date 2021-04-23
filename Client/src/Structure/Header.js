import React from "react";
import "../Style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  return (
    <Navbar bg="dark" variant="succes">
      <Navbar.Brand>
        <img
          alt=""
          src="/hacker_logo.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        Hack Chat
      </Navbar.Brand>
    </Navbar>
  );
}

export default Header;

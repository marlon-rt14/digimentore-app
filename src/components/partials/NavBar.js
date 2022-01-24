// import React, { useState, useCallback } from "react";

import {
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Box,
} from "@mui/material";

import { Link, NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";
import UserAccount from "./components/UserAccount";

export default function NavBar({
  user,
  setSignin,
  setSignup,
  initialSM,
  setStaticMsg,
  token,
  setUser,
  setToken,
}) {
  const navigate = useNavigate();

  const isActiveLink = (isActive) => {
    return {
      display: "block",
      margin: "1rem 0",
      color: isActive ? "#212121" : "#666666",
    };
  };

  const handleClickHome = () => {
    navigate("/home");
  };

  const handleClickAbout = () => {
    navigate("/about");
  };

  const handleClickAddLink = () => {
    navigate("/cards/add");
  };

  const handleClickListLinks = () => {
    navigate("/cards");
    // sendRequest();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-0 justify-content-center ">
      <div className="container p-0 m-0">
        <a className="navbar-brand" href="/">
          Digimentore Application
        </a>
        <button
          className="navbar-toggler border border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 justify-content-start">
            <ListItem
              disablePadding
              sx={{ width: "auto", paddingTop: "0", paddingBottom: "0" }}
            >
              <ListItemButton
                sx={{
                  color: "text.secondary",
                  width: "max-content",
                  paddingTop: "0",
                  paddingBottom: "0",
                }}
                onClick={() => handleClickHome()}
              >
                <NavLink
                  to="/home"
                  className="router-link"
                  style={({ isActive }) => isActiveLink(isActive)}
                >
                  <ListItemText primary="Home" />
                </NavLink>
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ width: "auto", paddingTop: "0", paddingBottom: "0" }}
            >
              <ListItemButton
                sx={{
                  color: "text.secondary",
                  width: "max-content",
                  paddingTop: "0",
                  paddingBottom: "0",
                }}
                onClick={() => handleClickAbout()}
              >
                <NavLink
                  to="/about"
                  className="router-link"
                  style={({ isActive }) => isActiveLink(isActive)}
                >
                  <ListItemText primary="About" />
                </NavLink>
              </ListItemButton>
            </ListItem>
          </ul>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 justify-content-end">
            {token ? (
              <>
                <ListItem disablePadding sx={{ width: "auto" }}>
                  <Link to="/cards/add" className="router-link">
                    <ListItemButton
                      sx={{ color: "text.secondary", width: "max-content" }}
                      onClick={() => handleClickAddLink()}
                    >
                      <ListItemText primary="New Link" />
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem disablePadding sx={{ width: "auto" }}>
                  <Link to="/cards" className="router-link">
                    <ListItemButton
                      sx={{ color: "text.secondary", width: "max-content" }}
                      onClick={() => handleClickListLinks()}
                    >
                      <ListItemText primary="All links " />
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem disablePadding sx={{ width: "auto", marginLeft: 2 }}>
                  <Link to="/profile" className="router-link">
                    <ListItemText primary={user.fullname} />
                  </Link>
                </ListItem>
                <ListItem disablePadding sx={{ width: "auto" }}>
                  <UserAccount
                    setUser={setUser}
                    setToken={setToken}
                  />
                </ListItem>
              </>
            ) : (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <button
                    className="nav-signin"
                    onClick={() => {
                      setStaticMsg(initialSM);
                      setSignin(false);
                      window.history.pushState(
                        {},
                        undefined,
                        window.location.origin + "/signup"
                      );
                      setSignup(true);
                    }}
                  >
                    <p>Sign up</p>
                  </button>
                </Link>
                <Link to="/signin" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setStaticMsg(initialSM);
                      setSignin(true);
                      window.history.pushState(
                        {},
                        undefined,
                        window.location.origin + "/signin"
                      );
                      setSignup(false);
                    }}
                  >
                    Sign in
                  </Button>
                </Link>
              </Box>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

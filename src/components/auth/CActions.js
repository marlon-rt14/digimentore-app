import React from "react";

import { CardActions, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { helpHttp } from "../../helpers/helpHttp";
// import { createBrowserHistory } from "history";

export default function CActions({
  signin,
  signup,
  setSignup,
  setSignin,
  setToken,
  setUser,
  userSelected,
  setStaticMsg,
}) {
  const urlSignin = "http://localhost:4000/api/saver-link/signin";
  const urlSignup = "http://localhost:4000/api/saver-link/signup";

  const navigate = useNavigate();

  const getDataUser = () => {
    if (signin) {
      return userSelected;
    }
    if (signup) {
      return {
        fullname: `${userSelected.fname} ${userSelected.lname}`,
        username: userSelected.username,
        password: userSelected.password,
      };
    }
    return null;
  };

  const config = {
    headers: {
      "content-type": "application/json",
      // "Access-Control-Allow-Origin": true,
    },
    data: getDataUser(),
    withCredentials: false,
    // crossorigin: true,
  };

  const handleAcept = () => {
    if (signin) {
      helpHttp()
        .post(urlSignin, config)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            setUser(res.user);
            setToken(res.token);
            window.localStorage.setItem("loggedUser", JSON.stringify(res));
            setStaticMsg({ open: false });
            setSignin(null);
          }
          navigate("/profile");
        })
        .catch((e) => {
          // console.log(e);
          if (e.status === 401) {
            const newMsg = {
              open: true,
              message: "Username or password are incorrects.",
              severity: "error",
            };
            setStaticMsg(newMsg);
          }
          if (e.status === 500) {
            const newMsg = {
              open: true,
              message: "Unable to fetch data   —    ",
              severity: "error",
              strong: " Try again",
            };
            setStaticMsg(newMsg);
          }
          // navigate("/signin");
        });
    }
    if (signup) {
      helpHttp()
        .post(urlSignup, config)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setUser(res.user);
            setToken(res.token);
            window.localStorage.setItem("loggedUser", JSON.stringify(res));
            const welcomeMsg = {
              open: true,
              message: "Welcome ",
              severity: "success",
              strong: res.user.fullname,
            };
            setStaticMsg(welcomeMsg);
            setSignup(null);
          }
          navigate("/profile");
        })
        .catch((err) => {
          console.log(err);
          if (err.status === 500) {
            const newMsg = {
              open: true,
              message: "Unable to fetch data   —    ",
              severity: "error",
              strong: " Try again",
            };
            setStaticMsg(newMsg);
          }
        });
    }
  };

  return (
    <CardActions
      sx={{
        justifyContent: signin ? "space-between" : "flex-end",
        px: 0,
        py: 2,
        mb: 3,
      }}
    >
      {signin && (
        <Link
          to="/signup"
          state={{ fromSignup: true }}
          style={{ textDecoration: "none" }}
        >
          <Button
            size="medium"
            variant="text"
            sx={{ textTransform: "none" }}
            onClick={() => {
              setSignin(false);
              setSignup(true);
              window.history.pushState(
                {},
                undefined,
                window.location.origin + "/signup"
              );
            }}
          >
            Create account
          </Button>
        </Link>
      )}

      <Button
        className="send-data"
        variant="contained"
        sx={{ textTransform: "none", px: 3, py: 1 }}
        onClick={() => {
          handleAcept();
        }}
      >
        Acept
      </Button>
    </CardActions>
  );
}

// const styleAcept = {
//   background: "#1976d2",
//   color: "#fff",
//   fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
//   fontWeight: 500,
//   fontSize: "0.875rem",
//   lineHeight: 1.75,
//   minWidht: "64px",
//   letterSpacing: "0.02857em",
//   border: "none",
//   outline: "none",
//   borderRadius: "4px",
//   padding: "0.5rem 1.5rem",
//   transition: "background .5s",
// };

// {/* <input
//   className="acept-login"
//   type="submit"
//   value="Acept"
//   style={styleAcept}
//   onClick={handleAcept}
// />; */}

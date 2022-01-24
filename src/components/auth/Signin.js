import React, { useState } from "react";

import {
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  // CardActions,
  // Button,
} from "@mui/material";
// import { Button } from "reactstrap";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import CHeader from "./CHeader";
import CActions from "./CActions";

const initialData = {
  username: "",
  password: "",
};

const customTextField = {
  flex: 1,
};

const customFormControl = {
  marginTop: 1,
  flex: customTextField.flex,
  padding: 0,
  width: "100%",
};

export default function Signin({
  signin,
  setSignup,
  setSignin,
  setUser,
  setStaticMsg,
  setToken,
}) {
  const [userSelected, setUserSelected] = useState(initialData);
  const [password, setPassword] = useState(false);

  const handleChange = (e) => {
    setUserSelected({
      ...userSelected,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeUser = (event) => {
    setUserSelected({
      ...userSelected,
      [event.target.name]: event.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setPassword(!password);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <CHeader title="Sign in" />
      <CardContent sx={{ px: 0 }}>
        <TextField
          autoFocus
          label="Username"
          variant="outlined"
          margin="dense"
          type="text"
          name="username"
          fullWidth
          required
          defaultValue={userSelected.username}
          onChange={(e) => handleChange(e)}
        />
        <FormControl variant="outlined" sx={customFormControl}>
          <InputLabel
            htmlFor="outlined-adornment-password"
            required
            sx={{ lineHeight: "1rem" }}
          >
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={password ? "text" : "password"}
            value={userSelected.password}
            name="password"
            onChange={(evt) => {
              handleChangeUser(evt);
            }}
            size="large"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {password ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </CardContent>
      <CActions
        signin={signin}
        setSignin={setSignin}
        setSignup={setSignup}
        userSelected={userSelected}
        setUser={setUser}
        setStaticMsg={setStaticMsg}
        setToken={setToken}
      />
    </>
  );
}

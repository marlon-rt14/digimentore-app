import React, { useState } from "react";

import {
  CardContent,
  TextField,
  Box,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CHeader from "./CHeader";
import CActions from "./CActions";

const customBox = {
  display: "flex",
  gap: 2,
};

const customTextField = {
  flex: 1,
};

const customFormControl = {
  marginTop: 1,
  flex: customTextField.flex,
  padding: 0,
};

const initialUser = {
  fname: "",
  lname: "",
  username: "",
  password: "",
};

export default function Signup({
  setStaticMsg,
  signup,
  setSignup,
  setToken,
  setUser,
}) {
  const [newUser, setNewUser] = useState(initialUser);
  const [password, setPassword] = useState(false);

  const handleClickShowPassword = () => {
    setPassword(!password);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const urlUsers = "http://localhost:4000/api/auth/signin";

  return (
    <form action={urlUsers} method="POST">
      <CHeader title="Sign up" />
      <CardContent sx={{ px: 0 }}>
        <Typography variant="body2" color="text.secondary">
          Contact information
        </Typography>
        <Box sx={customBox}>
          <TextField
            label="First name"
            variant="outlined"
            margin="dense"
            type="text"
            name="fname"
            fullWidth
            size="small"
            required
            value={newUser.fname}
            onChange={(e) => handleClickChange(e)}
            sx={customTextField}
          />
          <TextField
            label="Last name"
            variant="outlined"
            margin="dense"
            type="text"
            name="lname"
            onChange={(e) => handleClickChange(e)}
            fullWidth
            size="small"
            required
            value={newUser.lname}
            sx={customTextField}
          />
        </Box>
        <Box sx={customBox}>
          <TextField
            variant="outlined"
            label="Phone number"
            margin="dense"
            type="text"
            name="telefono"
            fullWidth
            size="small"
            sx={customTextField}
          />
          <TextField
            label="Address or City"
            variant="outlined"
            margin="dense"
            type="text"
            name="direccion"
            fullWidth
            size="small"
            sx={customTextField}
          />
        </Box>

        <Box sx={{ height: "1.5rem" }}></Box>
        <Typography variant="body2" color="text.secondary">
          Account information
        </Typography>
        <TextField
          label="E-mail"
          variant="outlined"
          margin="dense"
          type="email"
          name="email"
          fullWidth
          size="small"
        />
        <Box sx={customBox}>
          <TextField
            autoFocus
            label="Username"
            variant="outlined"
            margin="dense"
            type="text"
            name="username"
            fullWidth
            size="small"
            required
            value={newUser.username}
            onChange={(e) => handleClickChange(e)}
            sx={customTextField}
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
              name="password"
              value={newUser.password}
              onChange={(e) => handleClickChange(e)}
              size="small"
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
        </Box>
      </CardContent>
      <CActions
        signup={signup}
        setSignup={setSignup}
        setStaticMsg={setStaticMsg}
        userSelected={newUser}
        setToken={setToken}
        setUser={setUser}
      />
    </form>
  );
}

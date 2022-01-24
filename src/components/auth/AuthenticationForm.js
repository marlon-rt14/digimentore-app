import React from "react";

import { Box, Card } from "@mui/material";
import Signin from "./Signin";
import Signup from "./Signup";

export default function AuthenticationForm({
  signin,
  setSignin,
  signup,
  setSignup,
  setStaticMsg,
  setToken,
  setUser,
}) {
  return (
    <Box sx={{ maxWidth: "75%", m: "auto", mt: 4 }}>
      <Card
        sx={{ maxWidth: 445, m: "auto", px: 3, py: 0.5 }}
        variant="outlined"
      >
        {signin && (
          <Signin
            setSignin={setSignin}
            signin={signin}
            setSignup={setSignup}
            setStaticMsg={setStaticMsg}
            setToken={setToken}
            setUser={setUser}
          />
        )}
        {signup && (
          <Signup
            setStaticMsg={setStaticMsg}
            signup={signup}
            setSignup={setSignup}
            setToken={setToken}
            setUser={setUser}
          />
        )}
      </Card>
    </Box>
  );
}

// {signin && <Route path="/signin" element={<Signin />} />}
//           {!signin && <Route path="/signup" element={<Signup />} />}

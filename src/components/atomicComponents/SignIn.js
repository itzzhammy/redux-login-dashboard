import React, { useState } from "react";
import {Avatar, Button, CssBaseline, TextField, Box, Alert, Container, Typography} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Error from "./Error";

const theme = createTheme();

export default function SignIn(props) {

  const [emailError, setEmailError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [emailValue, setEmailValue] = useState(null);
  const [passwordValue, setPasswordValue] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let val = { email: data.get("email"), password: data.get("password") };
    props.getData(val);
  };
  
  const validEmail = (e) => {
    return /\S+@\S+\.\S+/.test(e);
  };

  const handleEmail = (event) => {
    event.length > 0 ? setEmailValue(true) : setEmailValue(false);
    if (!validEmail(event)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handlePassword = (event) => {
    event.length > 0 ? setPasswordValue(true) : setPasswordValue(false);
    if (event.length >= 8) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#0e6e0b" }}>
          </Avatar>
          <Typography component="h1" variant="h5" style={{fontWeight: 600, textDecorationLine: "underline"}}>
            Enter Credentials to Login Portal
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ width: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onBlur={(e)=> handleEmail(e.target.value)}
            />
            {emailValue && emailError && (
              <Error severity="error" message="Invalid Email format" />
            )}
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onBlur={(e)=> handlePassword(e.target.value)}
            />
            {passwordValue && passwordError && (
              <Error
                severity="error"
                valueVis="1000"
                message="Password must b 8 characters long"
              />
            )}

            {!props.isLoading ? (
              <Button
                disabled={emailError || passwordError}
                type="submit"
                fullWidth
                variant="contained"
                style={emailError || passwordError ? {} : {backgroundColor:"#0e6e0b", color:"white"} }
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            ) : (
              <LoadingButton
                loading
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Logging in
              </LoadingButton>
            )}
            {props.loginError && (
              <Alert severity="error">{props.loginError}</Alert>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

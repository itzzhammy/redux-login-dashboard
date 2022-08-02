import React, {useState} from "react";
import { Avatar, Stack, Typography, List, ListItem, ListItemButton, Drawer, Button, Box, Divider } from "@mui/material";
import Navbar from "./NavBar";

import { selectUser } from "../../reducers/userSlice";

import LockIcon from '@mui/icons-material/Lock';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PublicIcon from '@mui/icons-material/Public';

import { useSelector, useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router";
import { logout } from "../../reducers/userSlice";
import { NavLink } from "react-router-dom";


export default function TemporaryDrawer() {

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutFunc = (e) => {
    e.preventDefault();
    dispatch(logout({}));
    localStorage.removeItem('token')
    navigate("/login");
  };
  
  const user = useSelector(selectUser);
  const userList = useSelector((state) => state.userList);

  const { email } = user;
  
  const loggedUser = userList?.fetchedUsers?.find((user)=> user.email === email)

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <Avatar
              sx={{
                bgcolor: "#0e6e0b",
                marginLeft: 9,
                width: 55,
                height: 55,
              }}
              alt="Remy Sharp"
              src={loggedUser ? loggedUser.avatar : ""}
            >
            </Avatar>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <Typography style={{marginLeft:85, fontWeight: "bold", color:"#129e43"}}>{loggedUser ? `${loggedUser.first_name} ${loggedUser.last_name}` : "Test User"}</Typography>
        </ListItem>
        <ListItem disablePadding>
          <Typography style={{marginLeft:40, fontWeight: "bold", color:"#129e43"}}>{email}</Typography>
        </ListItem>
      </List>
      <Divider />
      <Divider />
      <List>
        <Stack
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Button color="inherit">
            <NavLink
              to="/dashboard"
              style={(isActive) => ({
                color: isActive ? "#129e43" : "black",
                textDecoration: isActive ? "none" : "underlined",
              })}
            >
              <DashboardIcon style={{marginBottom:-7}}/>  Dashboard
            </NavLink>
          </Button>
          <Button color="primary">
            <NavLink
              to="/country"
              style={(isActive) => ({
                color: isActive ? "#129e43" : "black",
                textDecoration: isActive ? "none" : "underlined",
              })}
            >
              <PublicIcon style={{marginBottom:-7}} />  Country
            </NavLink>
          </Button>
          
          <Button onClick={logoutFunc} style={{color: "#129e43"}}><LockIcon style={{marginLeft:0}}/>     Logout</Button>
        </Stack>
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Navbar clickMe={toggleDrawer} />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

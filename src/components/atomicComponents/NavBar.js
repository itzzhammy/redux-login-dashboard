import React, { useState } from "react";
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../reducers/userSlice";
import { selectUser } from "../../reducers/userSlice";
import LoadingButton from "@mui/lab/LoadingButton";
import { NavLink } from "react-router-dom";

export default function Navbar(props) {
    const dispatch = useDispatch();
    const [isLoading, setLoad] = useState();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNothing = () => { };

    const navigate = useNavigate();

    const logoutFunc = (e) => {
        e.preventDefault();
        setLoad(true);
        dispatch(logout({}));
        setAnchorEl(null);
        setLoad(false);
        localStorage.removeItem('token')
        navigate("/login");
    };

    const user = useSelector(selectUser);
    const { email } = user;
    const { isLoggedin } = user;

    const userList = useSelector((state) => state.userList);

    const loggedUser = userList?.fetchedUsers?.find((user)=> user.email === email)
    
    return (
        <Box sx={{ flexGrow: 1 }} marginBottom={2}>
            <AppBar position="static" sx={{ bgcolor: "green" }}>
                <Toolbar>
                    {isLoggedin && (
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={props.clickMe("left", true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {isLoggedin ? "Welcome To ReqRes" : "ReqRes"}
                    </Typography>
                    {isLoggedin ? (
                        !isLoading ? (
                            <>
                                <Button color="inherit" style={{borderColor: "#ffffff"}}>
                                    <NavLink
                                        to="/country"
                                        style={(isActive) => ({
                                            color: isActive ? "white" : "black",
                                            textDecoration: isActive ? "none" : "underlined",
                                        })}
                                    >
                                        Country
                                    </NavLink>
                                </Button>
                                <Button color="inherit">
                                    <NavLink
                                        to="/dashboard"
                                        style={(isActive) => ({
                                            color: isActive ? "white" : "black",
                                            textDecoration: isActive ? "none" : "underlined",
                                        })}
                                    >
                                        Dashboard
                                    </NavLink>
                                </Button>

                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <Avatar sx={{ bgcolor: "#0e6e0b", marginLeft: 3 }} src={loggedUser ? loggedUser.avatar : ""}>
                                    </Avatar>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    style={{ top: 64 }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleNothing}>{email}</MenuItem>
                                    <MenuItem onClick={logoutFunc}>Logout</MenuItem>
                                </Menu>

                            </>
                        ) : (
                            <LoadingButton
                                loading
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Submit
                            </LoadingButton>
                        )
                    ) : (
                        <Button disabled>
                            {" "}
                            <Typography
                                variant="h6"
                                component="div"
                                color="#fff"
                                sx={{ flexGrow: 1 }}
                            >
                                LOGIN
                            </Typography>
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

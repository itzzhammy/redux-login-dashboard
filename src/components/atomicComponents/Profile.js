import React, { useState } from "react";
import { Button, Card, Stack, Typography, Avatar } from "@mui/material";
import DetailDialog from "./DetailDialog";

export default function Profile({ userDetails }) {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <Card sx={{ maxWidth: 350, height:250 }}>
      <Stack justifyContent="center" alignItems="center">
        <Avatar
          alt="Remy Sharp"
          src={userDetails.userImg}
          sx={{ width: 56, height: 56, marginTop: 1, bgcolor: "#0e6e0b" }}
        />
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ marginTop: 1 }}
        >
          {userDetails.userName}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {userDetails.email}
        </Typography>
        <Button size="small" color="primary" onClick={handleClickOpen} style={{backgroundColor:"#0e6e0b", color:"white"}}>
          View Details
        </Button>
      </Stack>
      <DetailDialog open={open} handleClose={handleClose} userDetails={userDetails}/>
    </Card>
  );
}

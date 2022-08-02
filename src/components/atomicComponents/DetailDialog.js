import * as React from 'react';
import { Button, Stack, Card, Dialog, DialogActions, DialogContent, DialogTitle, Avatar, Typography } from '@mui/material';
import { deepPurple } from "@mui/material/colors";


const DetailDialog = ({ open, handleClose, userDetails }) => {

  return (
    <div>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
          {"User Details"}
        </DialogTitle>
        <DialogContent>
          <Card sx={{ maxWidth: 600 }}>
            <Stack justifyContent="center" alignItems="center">
              <Avatar
                alt="Remy Sharp"
                src={userDetails.userImg}
                sx={{ width: 56, height: 56, marginTop: 1, bgcolor: deepPurple[500] }}
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
            </Stack>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus style={{ backgroundColor: "#0e6e0b", color: "white" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DetailDialog

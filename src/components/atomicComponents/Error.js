import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

export default function Error(props) {

    const [open, setOpen] = useState(true);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const handleExited = () => { };

    return (
        <div>
            <Snackbar
                ContentProps={{
                    sx: {
                        backgroundColor: 'red', color: 'white'
                    }
                }}
                anchorOrigin={{ vertical:'top', horizontal:'right' }}
                open={open}
                onClose={handleClose}
                TransitionProps={{ onExited: handleExited }}
                TransitionComponent={'SlideTransition'}
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {props.message}
                </Alert>

            </Snackbar>
        </div>
    );
}

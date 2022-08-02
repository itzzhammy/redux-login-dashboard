import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers } from "../reducers/dashboardSlice";
import Profile from "../components/atomicComponents/Profile";
import { Alert, Button, Grid, Stack } from "@mui/material";
import { TailSpin } from "react-loader-spinner";
import LoadingButton from "@mui/lab/LoadingButton";

const DashboardView = () => {

  const [fetchLoader, setFetchLoader] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const fetchRequest = useCallback(() => {
    setFetchLoader(true);
    dispatch(fetchUsers());
  }, []);

  const userList = useSelector((state) => state.userList);

  return (
    <>
      {userList.error && (
        <Stack
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Alert severity="error">
            Error Detected: {userList.error} <br />
            Something went wrong
          </Alert>

          {!fetchLoader ? (
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
              onClick={fetchRequest}
            >
              Try Again
            </Button>
          ) : (
            <LoadingButton
              loading
              color="error"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </LoadingButton>
          )}
        </Stack>
      )}
      <Stack flexDirection="row" justifyContent="center" alignItems="center">
        {userList.loading && !userList.error ? (
          <TailSpin
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
          />
        ) : (
          <Grid
            container
            spacing={3}
            direction="row"
            justifyContent="center"
            alignItems="center"
            marginLeft={{ xs: 0, md: 0, lg: 0 }}
          >
            {userList.fetchedUsers &&
              userList.fetchedUsers.map((items) => (
                <Grid key={items.id} item xs={8} md={4} lg={3}>
                  <Profile
                    userDetails={{
                      email: items.email,
                      userName: items.first_name + items.last_name,
                      userImg: items.avatar,
                    }}
                  />
                </Grid>
              ))}
          </Grid>
        )}
      </Stack>
    </>
  );
};

export default DashboardView;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../reducers/countrySlice";
import AccordionCountry from "../components/atomicComponents/AccordionCountry";
import { Box, Stack, Tab } from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import { TailSpin } from "react-loader-spinner";
import CountryName from "../components/atomicComponents/CountryName";

const CountryView = () => {
    const [value, setValue] = useState("1");
    const countryList = useSelector((state) => state.countryList);

    const { loading, fetchedCountries, error } = countryList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountries());
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    return (
        <>
            <Stack justifyContent="center" alignItems="center">
                {countryList.loading && !countryList.error ? (
                    <TailSpin
                        height="80"
                        width="80"
                        radius="9"
                        color="green"
                        ariaLabel="three-dots-loading"
                    />
                ) : (
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList onChange={handleChange} 
                            textColor="black" 
                            TabTextProps={{
                                style: {
                                  color: "#129e43"
                                }}}
                            TabIndicatorProps={{
                                style: {
                                  backgroundColor: "#129e43"
                                }}}
                            aria-label="lab API tabs example">
                                <Tab label="Countries"  value="1" />
                                <Tab label="Countries Details" value="2" />
                            </TabList>
                        </Box>


                        <TabPanel direction="column" value="1">
                            <CountryName />
                        </TabPanel>

                        <TabPanel direction="column" value="2">
                            <AccordionCountry />
                        </TabPanel>
                    </TabContext>
                )}
            </Stack>
        </>
    );
};

export default CountryView;
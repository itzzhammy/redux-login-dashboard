import {
    Alert,
    Avatar,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import { TailSpin } from "react-loader-spinner";
import { useSelector } from "react-redux";

const CountryName = () => {

    const countryList = useSelector((state) => state.countryList);

    const { loading, fetchedCountries, error } = countryList;

    return (
        <>
            {!loading && fetchedCountries ? (
                fetchedCountries.map((i) => (
                    <Stack direction="column" key={i.name.common}>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            marginBottom={1}
                            marginTop={1}

                        >
                            <Avatar
                                sx={{ marginRight: 1 }}
                                alt={i.name.common}
                                src={i.flags.png}
                            />
                            <Typography width="250px">{i.name.common}</Typography>{" "}
                        </Stack>
                        <Divider />
                    </Stack>
                ))
            ) : (
                <TailSpin
                    height="80"
                    width="80"
                    radius="9"
                    color="green"
                    ariaLabel="three-dots-loading"
                />
            )}

            {error && !loading && (
                <Alert severity="error" sx={{ marginTop: 5 }}>
                    Error Detected: {error} <br />
                    Something went wrong
                </Alert>
            )}
        </>
    );

}

export default CountryName;

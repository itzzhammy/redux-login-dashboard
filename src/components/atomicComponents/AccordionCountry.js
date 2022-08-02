import * as React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Avatar } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";

export default function AccordionCountry() {
  const countryList = useSelector((state) => state.countryList);
  const { loading, fetchedCountries } = countryList;
  return (
    <div>
      {countryList.fetchedCountries && !loading ? (
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {countryList.fetchedCountries &&
            fetchedCountries.map((i) => (
              <Grid item xs={8} md={6} lg={4}>

                <Accordion key={i.name.common} sx={{ width: 300, marginBottom: 1 }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Avatar
                      sx={{ marginRight: 1 }}
                      alt={i.name.common}
                      src={i.flags.png}
                    />{" "}
                    <Typography style={{ fontWeight: "bold", marginTop: 8 }}>{i.name.common}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <b>Population</b>: {i.population}
                    </Typography>
                    <Typography>
                      <b>Timezones</b>:{" "}
                      {i.timezones.length > 0
                        ? i.timezones.map((tz, index) => (
                          <span>{`${tz}` + ", "}</span>
                        ))
                        : <span>No Timezone Found</span>}
                    </Typography>
                    <Typography>
                      <b>Capital</b>:{" "}
                      {i.capital && i.capital.length > 0
                        ? i.capital.map((capital) => (
                          <span>{capital}</span>
                        ))
                        : <span>No Capital City Found</span>}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}

        </Grid>
      ) :
        (
          <TailSpin
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
          />
        )
      }
    </div>
  );
}

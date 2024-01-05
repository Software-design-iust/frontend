import React from "react";
import ButtonAppBar from "../components/General/Navbar";
import SiteIntro from "../components/Home/SiteIntro";
import JobBox from "@/components/General/JobBox";
import jobs from "@/MockData/data";
import { Grid } from "@mui/material";

export default function Home() {
  return (
    <>
      <ButtonAppBar />
      <SiteIntro />
      <Grid
        container
        spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {jobs.map(({ imageURL, title, location, company, date, path }) => (
          <Grid item xs={12}  sm={4} md={4} key={title}>
            <JobBox
              imageURL={imageURL}
              title={title}
              location={location}
              company={company}
              date={date.toDateString()}
              path={path}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

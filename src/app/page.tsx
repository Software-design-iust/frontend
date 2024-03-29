import React from "react";

import SiteIntro from "../components/Home/SiteIntro";
import JobBox from "@/components/General/JobBox";
import {jobs} from "@/MockData/data";
import  Grid  from "@mui/material/Grid";
import EmployeeNavbar from "../components/General/EmployeeNavbar";
import Divider from '@mui/material/Divider';

export default function Home() {
  return (
    <>
      <EmployeeNavbar/>
      <SiteIntro />
      <Divider sx={{color:'info.main'}}>The latest job ads</Divider>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {jobs.map(({ imageURL, title, location, company, date,id }) => (
          <Grid item xs={12}  sm={4} md={4} key={id}>
            <JobBox
              imageURL={imageURL}
              title={title}
              location={location}
              company={company}
              date={date.toDateString()}
              id={id}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

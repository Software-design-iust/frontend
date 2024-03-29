'use client'
import React, { useEffect, useState } from "react";
import EmployeeNavbar from "@/components/General/EmployeeNavbar";
import Jobheader from "@/components/Job/Jobheader";
import Grid from "@mui/material/Grid";
import {jobs} from "@/MockData/data";
import Jobdescription from "@/components/Job/Jobdescription";
import JobBox from "@/components/General/JobBox";
import Divider from '@mui/material/Divider';

export default function Page({ params }: { params: { id: string } }) {
  const Job = jobs.find((job) => job.id === params.id);
  const [job, setJob] = useState<any | null>(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/job/api/job-details/${params.id}`)
      .then(response => response.json())
      .then(data => {
        setJob(data.job);
        setRelatedJobs(data.related_jobs);
      })
      .catch(error => console.error('Error:', error));
  }, [params.id]);
  if(!job){
  if (!Job) {
    return <>page not found</>;
  }
  return (
    <>
      <EmployeeNavbar />
      <Jobheader
        imageURL={Job?.imageURL}
        title={Job?.title}
        company={Job?.company}
        location={Job?.location}
        website={Job?.website}
      />
      <Jobdescription
        summary={Job?.summary}
        responsibilities={Job?.responsibilities}
        qualifications={Job?.qualifications}
        salary={Job?.salary}
        date={Job?.date.toDateString()}
      />
      <Divider sx={{color:'info.main'}}>related job</Divider>
      {/* related job advertisements */}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {jobs.map(({ imageURL, title, location, company, date, id }, index) => {
          if (index < 3) {
            return (
              <Grid item xs={12} sm={4} md={4} key={id}>
                <JobBox
                  imageURL={imageURL}
                  title={title}
                  location={location}
                  company={company}
                  date={date.toDateString()}
                  id={id}
                />
              </Grid>
            );
          }
        })}
      </Grid>
    </>
  );}
  return (
    <>
      <EmployeeNavbar />
      <Jobheader
        imageURL={job?.imageURL}
        title={job?.title}
        company={job?.company}
        location={job?.location}
        website={job?.website}
      />
      <Jobdescription
        summary={job?.summary}
        responsibilities={job?.responsibilities}
        qualifications={job?.qualifications}
        salary={job?.salary}
        date={new Date(job?.timestamp).toDateString()}
      />
      <Divider sx={{color:'info.main'}}>related job</Divider>
      {/* related job advertisements */}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >{relatedJobs.map(({ imageURL, title, location, company, timestamp, id }) => (
        <Grid item xs={12} sm={4} md={4} key={id}>
          <JobBox
            imageURL={imageURL}
            title={title}
            location={location}
            company={company}
            date={new Date(timestamp).toDateString()}
            id={id}
          />
        </Grid>
      ))}
    </Grid>
  </>
);
}

'use client'
import React, { useRef, useState } from 'react';
import  Box  from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AuthButton from "@/components/authentication/AuthButton";
import AuthInput from "@/components/authentication/AuthInput";
import { Typography } from '@mui/material';
import Link from 'next/link';

export default function Page() {
  const imageUrl = "/authentication/signup.svg";
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error,setError]=useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    // TODO: Add validation for email, password, and confirmPassword

    const response = await fetch('http://127.0.0.1:8000/users/api/register-applicant/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password1: password, password2: confirmPassword })
    });

    const data = await response.json();

    if (response.status === 201) {
      // TODO: Handle successful registration (e.g., redirect to login page)
      console.log('Your account has been created successfully.', data);
      setError('')
    } else {
      // TODO: Handle errors from the API
  
      setError(data.message)
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        justifyContent={"center"}
        alignItems="center"
        direction='column'
        spacing={4}
        
        sx={{
          backgroundImage: `url(${imageUrl})`,
          height: "80%",
          width: "80%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
     <form onSubmit={handleSubmit}>
            <Grid     container
        justifyContent={"center"}
        alignItems="center"
        direction='column'
        spacing={4}
        sx={{paddingTop:'30%'}}>
        <Grid item><AuthInput ref={emailRef} placeholder="   Your Email" type='email'></AuthInput></Grid>
        <Grid item><AuthInput ref={passwordRef} placeholder="   Password" type='password'></AuthInput></Grid>
        <Grid item><AuthInput ref={confirmPasswordRef} placeholder="   Confirm Password" type='password'></AuthInput></Grid>
        <Grid item container justifyContent="flex-end" sx={{paddingRight:'200px'}}>  <AuthButton disabled={loading} name={'Sign Up'}/></Grid>
        <Link href='/authentication/employee/login'><Typography variant='body1'>Log in</Typography></Link>
        </Grid>
        </form>
        <Typography sx={{color:'red'}} variant='body2'>{error}</Typography>
      </Grid>
    
    </Box>
  );
}

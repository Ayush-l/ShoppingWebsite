import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export const SignUp = () => {
    
    const [email, setEmail] = useState("");
    const [password,changePassword]=useState("");
    const [confirmPassword,changeConfirmPassword]=useState("");
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword){
            alert("Password and Confirm Password do not match");
            return;
        }
        const response = await fetch('http://localhost:8080/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName:firstName,
                lastName:lastName,
                email:email,
                passWord:password
            }),
        });
        if (response.status === 201) {
            alert("User Created Successfully");
            navigate("/login");
        }
        else if(response.status === 406){
            alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
        } 
        else if(response.status === 208){
            alert("User Already Exists");
            navigate("/login");
        }
        else{
            alert("Not Acceptable");
        }
    }

    const navigate=useNavigate();


    return (
        <div style={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor:"#f0f0f0"}}>
            <div style={{border:"1px solid grey", borderRadius:"10px", backgroundColor:"white", boxShadow:"0 0 10px rgba(0, 0, 0, 0.1)"}}>
                <Box 
                    component="form" 
                    onSubmit={handleSubmit} 
                    sx={{ display: 'flex', flexDirection: 'row',maxWidth:"500px",flexWrap:'wrap', gap: 2, margin: 'auto' ,justifyContent: 'center'}}
                   pt={10}
                   px={10}
                >
                    <Typography variant="h5">Sign Up</Typography>
                    <TextField
                        label="First Name"
                        name="firstName"
                        type="firstName"
                        value={firstName}
                        onChange={(e) =>setFirstName(e.target.value)}
                        required
                        style={{width: '300px'}}
                        />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        type="lastName"
                        value={lastName}
                        onChange={(e) =>setLastName(e.target.value)}
                        required
                        style={{width: '300px'}}
                        />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) =>setEmail(e.target.value)}
                        required
                        style={{width: '300px'}}
                        />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={password}
                        style={{width: '300px'}}
                        onChange={(e)=>changePassword(e.target.value)}
                        required
                        />
                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        style={{width: '300px'}}
                        onChange={(e)=>changeConfirmPassword(e.target.value)}
                        required
                        />
                    <Button type="submit" variant="contained" color="primary" style={{width: '300px',height: '50px'}}>
                        Login
                    </Button>
                </Box>
                <Box
                    sx={{ display: 'flex', flexDirection: 'row',maxWidth:"500px",flexWrap:'wrap', gap: 0, margin: 'auto' ,justifyContent:'flex-start'}}
                    px={13}
                    pb={10}
                    pt={1}
                >
                    <Typography sx={{ m: 0 ,p:0}}>If you already have an account</Typography>
                    <Button color='primary' style={{padding:"0px"}} onClick={()=>{
                        navigate("/login")
                    }}>Sign Up</Button>
                </Box>
            </div>
        </div>
    );  
}

export default SignUp;
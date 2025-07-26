import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export const Login = () => {
    
    const [email, setEmail] = useState("");
    const [password,changePassword]=useState("");
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:8080/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                email:email,
                passWord:password 
            }),
        });
        if(response.ok) {
            const data=await response.json();
            const jwt=data.jwt;
            localStorage.setItem("jwt", jwt);
            navigate("/")
        }
        else{
            alert("Invalid Credentials");
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
                    <Typography variant="h5">Login</Typography>
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
                    <Typography sx={{ m: 0 ,p:0}}>If you don't have an account</Typography>
                    <Button color='primary' style={{padding:"0px"}} onClick={()=>{
                        navigate("/signup")
                    }}>SignUp</Button>
                </Box>
            </div>
        </div>
    );  
}

export default Login;
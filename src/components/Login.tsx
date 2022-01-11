import React from 'react'
import { Button } from '@mui/material'
import { Container } from '@mui/material';

interface propsLogin {
    authURL: string;
}

const Login: React.FC<propsLogin> = ({authURL}) => {
    return (
        <Container sx={{display: "flex", justifyContent: "center", alignItems: "center", minHeight:"80vh"}}> 
            <Button variant='contained' style={{width:"20%", padding: "20px", backgroundColor:"#1DB954"}} href={authURL}>LOGIN</Button>
        </Container>
    )
}

export default Login;
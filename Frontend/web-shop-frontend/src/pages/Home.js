import {  Typography, Button, Container } from '@mui/material';
import {  NavLink } from 'react-router-dom';

const Home = ()=>{

   

return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
            <Typography variant="h4" gutterBottom>
                Welcome to Online Shop!
            </Typography>
            <Typography variant="h6" gutterBottom>
                Please make an account to get started, if you already have one, sign in.
            </Typography>
            <Button variant="contained" color="primary" to="/login" component={NavLink} sx={{ marginRight: 2 }}>
                Sign in
            </Button>
            <Button variant="contained" color="secondary" to="/registration" component={NavLink}>
                Make account
            </Button>
            </div>
          </Container>
);
}

export default Home;

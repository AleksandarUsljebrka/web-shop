import { NavLink, Link } from 'react-router-dom'
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const appBarStyles = {
    backgroundColor: '#2196F3',
  };
  
  const titleStyles = {
    flexGrow: 1,
    marginLeft: '8px',
  };

 

const Header = () => {
    const navigate = useNavigate();

    const handleAuthClick = (path) => {
      navigate(path);
    };
    return (
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Online Shop
              </Typography>
              <Button color="inherit" onClick={()=>handleAuthClick('/login')}>Login</Button>
              <Button color="inherit" onClick={()=>handleAuthClick('/registration')}>Register</Button>
            </Toolbar>
          </AppBar>
          <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
            <Typography variant="h4" gutterBottom>
                Welcome to Online Shop!
            </Typography>
            <Typography variant="h6" gutterBottom>
                Please make an account to get started, if you already have one, sign in.
            </Typography>
            <Button variant="contained" color="primary" onClick={()=>handleAuthClick('/login')} sx={{ marginRight: 2 }}>
                Sign in
            </Button>
            <Button variant="contained" color="secondary" onClick={()=>handleAuthClick('/registration')}>
                Make account
            </Button>
            </div>
          </Container>
        </div>
      );
}
export default Header;
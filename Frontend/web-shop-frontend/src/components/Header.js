import { NavLink, Link } from 'react-router-dom'
import React from 'react';

import { AppBar, Toolbar, Typography, Button} from '@mui/material';

const appBarStyles = {
    backgroundColor: '#2196F3',
  };
  
  const titleStyles = {
    flexGrow: 1,
    marginLeft: '8px',
  };

 

const Header = () => {

    return (
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Online Shop
              </Typography>
              <Button color="inherit" to="/login" component={NavLink}>Login</Button>
              <Button color="inherit" to="/registration" component={NavLink}>Register</Button>
            </Toolbar>
          </AppBar>
          
        </div>
      );
}
export default Header;
import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleLoginComponent = () => {
  const responseGoogle = (response) => {
    console.log(response);
   
  };

  return (
    <div>
      <GoogleLogin
        clientId="40212839770-kdmco4dcg8a9i83dbmvh6iesi3m1tcie.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default GoogleLoginComponent;

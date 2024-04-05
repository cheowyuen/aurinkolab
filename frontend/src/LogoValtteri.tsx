
import React from 'react';

// Define your component
const Valtterin: React.FC = () => {
  // URL of the logo image hosted on the web
 
  const logoUrl = 'https://github-production-user-asset-6210df.s3.amazonaws.com/90505198/319107320-127aaf26-6ac1-44f5-84d1-62c8583c6aa9.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240404%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240404T132515Z&X-Amz-Expires=300&X-Amz-Signature=9d8ee8a83945095b3c5aa0ff160180bc49ed3526546edc39f102e9729a5489ee&X-Amz-SignedHeaders=host&actor_id=69098107&key_id=0&repo_id=781296762';

  return (
    <header>
      {/* Use the logo URL */}
      <img src={logoUrl} alt="Logo" width="400px" height="300px"/>
      {/* Add any other header content */}
    </header>
  );
}


export default Valtterin ;
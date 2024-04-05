import React from 'react';

const Elvene: React.FC = () => {
 
  const logoUrl = 'https://elveneboats.com/wp-content/uploads/2023/05/Elvene_wordmark_nega-1024x277.png';

  return (
    <div>
      <img src={logoUrl} alt="Logo" width="400px" height="300px"/>
     
    </div>
  );
}


export default Elvene ;
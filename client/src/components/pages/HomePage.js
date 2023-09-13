import React from 'react'

function HomePage() {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '150px auto 0',
      textAlign: 'center',
      padding: '20px',
      fontSize: '35px'
    }}>
      Welcome to the OSRS setup library. To access all the features of this page, 
      please create an account by clicking <strong>Sign Up</strong> in the Nav Bar on the top right 
      of the page. After creating an account, please <strong>Log In</strong> to access your setups 
      in the setup tab. Create new setups by clicking <strong>Add Setup</strong> and fill in the 
      different inputs with the gear you would like to add to each slot.
    </div>
  );
}

export default HomePage;
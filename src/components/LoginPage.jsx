import React from 'react'
import { SignIn } from '@clerk/clerk-react'

const LoginPage = () => {
  return (
    <div className="login-container">
     
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: {
                backgroundColor: '#007bff',
                '&:hover': {
                  backgroundColor: '#0056b3'
                }
              },
              card: {
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                border: 'none'
              },
              rootBox: {
                width: '100%',
                maxWidth: '400px'
              },
              form: {
                width: '100%'
              }
            }
          }}
        />
      </div>
    
  )
}

export default LoginPage 
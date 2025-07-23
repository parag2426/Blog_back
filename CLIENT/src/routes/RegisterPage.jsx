import { SignUp } from '@clerk/clerk-react';
import React from 'react'

const RegisterPage = () => {
    return (
    <div className='flex items-centers justify-center h -[calc(100vh-80px)]'>
      <SignUp signInUrl="/login"/>
    </div>
  )
}

export default RegisterPage ; 

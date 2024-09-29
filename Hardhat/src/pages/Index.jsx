import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div>
        <Link to='/adminlogin'>Admin Login</Link>
        <Link to='/register'>Voter Register</Link>
    </div>
  );
}

export default Index;

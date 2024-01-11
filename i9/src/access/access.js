import React from 'react';
import { Link } from 'react-router-dom';
import './access.css';


const Access = () => {
  return (
    <div className="access-page">
      <div className='content'>
        <div className='access-side-container-holder'>
        </div>
        <div className='access-container-holder'>
          <h2>Get Access Here</h2>
          <div className="access-buttons">
            <Link to="/access/login">
              <button>Login</button>
            </Link>
            <Link to="/access/register">
              <button>Register</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Access;

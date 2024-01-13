// ProfileMenu.js
import React from 'react';
import PropTypes from 'prop-types';
import './profileMenu.css';
const ProfileMenu = ({ user, logout }) => {
  return (
    <div className="profile-menu-container">
      <div>Username: {user.username}</div>
      <div>Name: {user.first_name} {user.last_name}</div>
      <button onClick={logout}>Sign Out</button>
    </div>
  );
};

ProfileMenu.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

export default ProfileMenu;

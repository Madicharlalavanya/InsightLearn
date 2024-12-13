import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    alert('Logged out!');
    navigate('/');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#411900',
      color: 'white',
      padding: '10px 20px'
    }}>
      <h1>INSIGHT LEARN</h1>
      <div style={{ position: 'relative' }}>
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg"
          alt="Profile"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            cursor: 'pointer'
          }}
          onClick={toggleDropdown}
        />
        {dropdownOpen && (
          <div style={{
            position: 'absolute',
            right: 0,
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '5px',
            marginTop: '10px',
            width: '100px',
            zIndex: 10
          }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: '5px 0' }}>
              <li style={{ padding: '10px', cursor: 'pointer', color: 'black' }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Profile</Link>
              </li>
              <li
                style={{ padding: '10px', cursor: 'pointer', color: 'black' }}
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

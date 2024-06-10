import React, { useContext } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation
import { AuthContext } from '../../Context/AuthContext'; // Import AuthContext

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext); // Use AuthContext
  const navigate = useNavigate();

  return (
    <div className='navbar'>
      <div>
        <h1 style={{ textDecoration: 'none', fontSize: '1.8rem', color: 'orange', fontWeight: 'bold' }}>OrderMunch</h1>
      </div>
      {isAuthenticated && (
        <div className="navbar-profile">
          <img className='profile' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWQgDtPZFPHDTamdUknRkBIfwtBI6pjtqWFZ67JfmWG3-QrYJ9ce2nMhU7oA&s" alt="Profile" />
          <button onClick={logout} className="logout-button">
            {/* <img src="/assets/to/logout_icon.png" alt="" className="logout-icon" /> */}
            <p>Logout</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;

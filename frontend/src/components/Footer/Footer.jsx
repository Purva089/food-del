import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
        <Link to='/' style={{ textDecoration: 'none', fontSize:"1.8rem", color:"orange", fontWeight:"bold"}}>OrderMunch</Link>
            <p>Indulge in a culinary adventure with OrderMunch, your ultimate destination for delicious eats delivered right to your doorstep. Browse our diverse menu, place your order, and let us satisfy your cravings. With a commitment to quality and convenience, we're here to elevate your dining experience. Explore our offerings today and taste the difference.</p>
            <div className="footer-social-icons">
                <a href="https://google.com"><img src={assets.facebook_icon} alt="" /></a>
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91-1234567890</li>
                <li>contact@ordermunch.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © ordermunch.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer

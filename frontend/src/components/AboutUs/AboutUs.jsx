import React from 'react'
import './AboutUs.css'
import { assets } from '../../assets/assets'

const AboutUs = () => {
    return (
        <div className='about-us' id='about-us'>
        <div className='about-us-content'>
            <h2>About Us</h2>
            <p>Welcome to <span>OrderMunch</span>, your go-to destination for quick and easy food ordering and delivery. Our mission is to bring you delicious meals from your favorite local restaurants right to your door with just a few clicks.</p>
            <span>What We Offer:</span>
            <ul>
                <li><span>Variety</span>: A diverse menu from local eateries catering to all tastes and dietary needs.</li>
                <li><span>Convenience</span>: Simple and secure online ordering with order tracking.</li>
                <li><span>Speed</span>: Fast and reliable delivery ensuring your food arrives fresh and hot.</li>
                <li><span>Customer Service</span>: Dedicated support available 24/7 to assist you.</li>

            </ul>
        </div>
            <div className="about-us-photo">
                <img src={assets.about_us} alt="" />
                {/* <img src={assets.app_store} alt="" /> */}
            </div>
        </div>
    )
}

export default AboutUs

import React from 'react'
import './Header.css'

const Header = () => {
    return (
        <div className='header'>
            <div className='header-contents'>
                <h2>Satisfy your hunger with us.</h2>
                <p>Explore a rich variety of flavors with our diverse menu, featuring mouthwatering dishes made from premium ingredients and crafted with culinary excellence. Our goal is to fulfill your cravings and elevate your dining pleasure, one delightful meal at a time.</p>
                <a href='#explore-menu'>View Menu</a>
                {/* <button onClick={() => window.location.href = '/menu'}>View Menu</button> */}
            </div>
        </div>
    )
}

export default Header

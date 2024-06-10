import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    const [phoneError, setPhoneError] = useState("");
    const [nameError, setNameError] = useState("");
    const [zipCodeError, setZipCodeError] = useState("");

    const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems } = useContext(StoreContext);
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === 'phone') {
            const phonePattern = /^[6-9]\d{9}$/;
            if (!phonePattern.test(value)) {
                setPhoneError("Please enter a valid Indian phone number.");
            } else {
                setPhoneError("");
            }
        } else if (name === 'firstName' || name === 'lastName') {
            const namePattern = /^[a-zA-Z]+$/;
            if (!namePattern.test(value)) {
                setNameError("Names should contain only letters.");
            } else {
                setNameError("");
            }
        } else if (name === 'zipcode') {
            const zipPattern = /^\d+$/;
            if (!zipPattern.test(value)) {
                setZipCodeError("Zip code should contain only numbers.");
            } else {
                setZipCodeError("");
            }
        }

        setData(data => ({ ...data, [name]: value }));
    };

    const placeOrder = async (e) => {
        e.preventDefault();

        const phonePattern = /^[6-9]\d{9}$/;
        const namePattern = /^[a-zA-Z]+$/;
        const zipPattern = /^\d+$/;

        if (!phonePattern.test(data.phone)) {
            setPhoneError("Please enter a valid phone number.");
            return;
        }

        if (!namePattern.test(data.firstName) || !namePattern.test(data.lastName)) {
            setNameError("Names should contain only letters.");
            return;
        }

        if (!zipPattern.test(data.zipcode)) {
            setZipCodeError("Zip code should contain only numbers.");
            return;
        }

        let orderItems = [];
        food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        });
        
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 50, 
        };

        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
        } else {
            toast.error("Something Went Wrong");
        }
    };

    useEffect(() => {
        if (!token) {
            toast.error("To place an order sign in first");
            navigate('/cart');
        } else if (getTotalCartAmount() === 0) {
            navigate('/cart');
        }
    }, [token]);

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className="multi-field">
                    <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' required />
                    <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' required />
                </div>
                {nameError && <p className="error-message">{nameError}</p>}
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' required />
                <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' required />
                <div className="multi-field">
                    <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' required />
                    <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' required />
                </div>
                <div className="multi-field">
                    <input type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' required />
                    <input type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' required />
                </div>
                {zipCodeError && <p className="error-message">{zipCodeError}</p>}
                <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' required />
                {phoneError && <p className="error-message">{phoneError}</p>}
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details"><p>Subtotal</p><p>₹{getTotalCartAmount()}</p></div>
                        <hr />
                        <div className="cart-total-details"><p>Delivery Fee</p><p>₹{getTotalCartAmount() === 0 ? 0 : 50}</p></div>
                        <hr />
                        <div className="cart-total-details"><b>Total</b><b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}</b></div>
                    </div>
                </div>
                <button className='place-order-submit' type='submit'>Proceed To Payment</button>
            </div>
        </form>
    );
}

export default PlaceOrder;

import React, { useState, useEffect } from 'react';
import './Checkout.css';
import { Link } from 'react-router-dom';
import CheckoutItem from './CheckoutItem';
import useSignUpForm from '../hooks/useSignUpForm';
import { Badge } from '@material-ui/core'
const Checkout = ({ cart }) => {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let gTotal = 0;
    cart.forEach((item) => {
      gTotal = gTotal + (item.price * item.count);
    })
    setTotal(gTotal);
  }, [cart]);
  const placeOrder = () => {
    
  }
  const { input, handleSubmit, handleInputChange } = useSignUpForm(placeOrder);

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <h3>Check the below items</h3>
      <Link to={{
        pathname: `/cart`,
      }}>Click here to change the cart</Link>
      <div className="checkout__items">
        {
          cart.map((checkoutItem, index) => <Badge key={checkoutItem.item} color="secondary" badgeContent={checkoutItem.count}><CheckoutItem  index={index} checkoutItem={checkoutItem} /></Badge>)
        }
      </div>

      <div className="checkout__total">
        <h1><strong>Total : </strong> {total}</h1>
      </div>


      <div className="checkout__shipping">
        <form onSubmit={handleSubmit} className="form__shipping">
          <label htmlFor='card number'>card number :</label>
          <input placeholder='card number' onChange={handleInputChange} name="card number" type="text" />
          <label htmlFor='expiration date'>expiration date :</label>
          <input placeholder="expiration date" onChange={handleInputChange} name="expiration date" type="text" />
          <label htmlFor='cvv'>cvv :</label>
          <input placeholder="cvv" onChange={handleInputChange} name="cvv" type="text" />
          <label htmlFor='address1'>Address Line 1 :</label>
          <input placeholder="Address Line 1" onChange={handleInputChange} name="address1" type="text" />
          <label htmlFor='phone'>Phone :</label>
          <input placeholder="Mobile Number" onChange={handleInputChange} name="phone" type="tel" />
          <button type="submit">{"Order Now"}</button>
        </form>
      </div>

    </div>
  )
}

export default Checkout;
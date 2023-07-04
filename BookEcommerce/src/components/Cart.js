import React, { useEffect, useContext, useState, useRef } from 'react';
import Nav from './Nav';
import { useHistory } from "react-router-dom";
import CartItem from './CartItem'
import fire from '../Firebase'
import UserContext from '../hooks/userContext';
import ClipLoader from "react-spinners/ClipLoader";
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import './Cart.css'
const Cart = (props) => {
  const css = {
    'display': 'flex',
    'margin': 'auto',
  }
  const history=useHistory();
  const ref = useRef();
  const [height, setHeight]=useState(0);
  const user = useContext(UserContext);
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setEror] = React.useState('');
  useEffect(() => {

    const userCartRef = fire.db.collection('cart').doc(user.email);
    const unsubscribe = userCartRef.onSnapshot((doc) => {
      if (doc.exists) {
        let gTotal = 0;
        setCart(doc.data());
        doc.data().products.length <= 0 && setEror("No Items in the Cart !");
        doc.data().products.forEach((item, index) => {
          gTotal = gTotal + (item.price * item.count);
        })
        setTotal(gTotal);
        setLoading(false);
      } else {
        setEror("No Items in the Cart !");
        setLoading(false);
      }
    });
    return () => {
      setHeight(0);
      unsubscribe();
      setTotal(0);
    }
  }, [user.email]);
 
  const handleArrow = (value) =>{
    if(height + value < ref.current.offsetWidth)
    {
      ref.current.scrollBy(value,0);
      setHeight(prev=>prev + value);
    }     
  }
  
  const linkToCheckout =()=>{
    history.push("/checkout");
  }

  return loading ?
    <ClipLoader color={"black"} css={css} loading={loading} size={150} /> :
    (
      <div className="cart">
        <Nav
          isCart={props.isCart}
          basket={props.basket}
          cartLength={props.cartLength}
          search={props.search}
          handleAuth={props.handleAuth}
          handleSearch={props.handleSearch}
        />
        <React.Fragment>
         
            {
              error ?
                <Alert severity="info">
                  <AlertTitle>Add Item to Cart</AlertTitle>
                  {error}
                </Alert> :
                <div ref={ref} className="cart__books">
                  {
                    cart.products !== undefined && cart.products.map(cartitem =>
                      {

                        return (<CartItem
                       
                          key={cartitem.item}
                          cartitem={cartitem} />)
                      }
                  
                    )
                  }
                </div>
            }
            <Divider/>
            <div className="cart__placeOrder">
              <IconButton
                onClick={()=>handleArrow(-100)}
                >
                <KeyboardArrowLeftIcon/>
              </IconButton>
              <h1>Total :  {total && total.toFixed(2)}</h1>

              <button
                onClick={linkToCheckout}
                className={(cart.products ? 
                          cart.products.length : 0)> 0 ? 
                          "cart__placeOrderEnabled" : 
                          "cart__placeOrderDisabled"}>
                {"Checkout"}
              </button>
              <IconButton 
                onClick={()=>handleArrow(100)}
              >
                <KeyboardArrowRightIcon/>
              </IconButton>
            </div>
        </React.Fragment>
      </div>
    )
}

export default Cart;
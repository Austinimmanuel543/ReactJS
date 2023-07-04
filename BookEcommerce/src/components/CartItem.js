import React, { useEffect, useState, useContext } from 'react';
import './CartItem.css'
import {Link} from 'react-router-dom'
import fire from '../Firebase';
import useBasket from '../hooks/useBasket'
import UserContext from '../hooks/userContext';
import {Button} from '@material-ui/core';
const CartItem = (props) => {
  const user = useContext(UserContext);
  const [cartProduct, setCartProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const { cartitem } = props;
  const ref = React.createRef();

  useEffect(() => {
    const unsubscribe = fire.db.collection('books').doc(cartitem.item.toString()).onSnapshot(docs => {
      if (docs.exists) {
        setCartProduct(docs.data());
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    }
  }, [cartitem])

  const { dispatch } = useBasket(user);
  return (
   
     <div ref={ref} 
             className="cartitem">
            {loading ?
              <img alt="loading" src="https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" /> :
              <Link to={{
                pathname: `/product/${cartitem.item.toString()}`
              }}><img alt={cartProduct.price} src={cartProduct.img} /></Link>}
            <div
             
              className="cartitem__details">
              <p><strong>Price : </strong>{cartProduct.price}  </p>
              <p><strong>Quantity : </strong>{props.cartitem.count}</p>
              <p><strong>Subtotal : </strong>{cartProduct.price && (parseFloat(cartitem.count) * parseFloat(cartProduct.price)).toFixed(2)}
              </p>
            </div>
            <Button
             color="secondary"
             variant="contained"
              onClick={() => dispatch({
                type: "REMOVE_FROM_BASKET", payload: {
                  price: cartProduct.price,
                  id: props.cartitem.item.toString()
                }
              })}>
            Remove
            </Button>
    </div>
  )
}

export default CartItem;
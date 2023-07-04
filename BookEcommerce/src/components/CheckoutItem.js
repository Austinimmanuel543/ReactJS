import React, {useEffect, useState} from 'react';
import './CheckoutItem.css';
import fire from '../Firebase';
const CheckoutItem = ({index,checkoutItem}) => {
  const [checkItem, setCheckItem]=useState({});
  useEffect(()=>{
  	fire.db.collection('books').doc(checkoutItem.item).get().then(docs=>{
  		setCheckItem(docs.data());
  	})
  },[checkoutItem])
 
  return (
    <div className="checkout__item">
    	<img alt={checkItem.name} src={checkItem.img}/>
    	<div className="checkout__itemInfo">
    		<div className="checkout__itemInfoData">
          <span className="checkout__itemInfoHeading">
            {"Name :  "}
          </span>
          <span>
            {checkItem.name}
          </span>
        </div>
        <div className="checkout__itemInfoData">
          <span className="checkout__itemInfoHeading">
          {"Price :  "}
          </span>
          <span>
           {checkoutItem.price}
          </span>
        </div>
        <div className="checkout__itemInfoData">
          <span className="checkout__itemInfoHeading">
            {"Quantity :  "}
          </span>
          <span>
            {checkoutItem.count}
          </span>
        </div>
    	</div>
    </div>
  )
}

export default CheckoutItem;
import {useReducer} from 'react';
import fire from '../Firebase';

const useBasket = (props) => {
 
  const initialState ={
    basket: [],
    basketLength:0
  };
  const count = (products, id)=>{
    let index = -1;
    products.forEach((item, i)=>{
      if (item.item ===id) {
        index = i;
        return index;
      }
    })
    return index;
  }
  const reducer = (state, action) =>{
    console.log(props.email)
    const basketRef = fire.db.collection('cart').doc(props.email)

  	switch(action.type)
  	{

  		case 'ADD_TO_BASKET':
          basketRef.get().then(data=>{
            if (data.exists) {
              var fetchPro = data.data();
              var f = true;
              fetchPro.products.forEach((pro, index)=>{
                if (pro.item === action.payload.id) {
                  let initial = pro.count + 1;
                  fetchPro.products[index].count = initial;
                  f = false;
                }
              })
              if (f) {
                fetchPro.products.push({
                  count : 1,
                  item: action.payload.id,
                  price : action.payload.price
                })
              }
               basketRef.set(fetchPro);
            }else{
              basketRef.set({
                products: [{item :action.payload.id, 
                            count : 1, 
                            price : action.payload.price}],
              })
            }
          })
          return {
            ...state,
          }
         
              
      case 'REMOVE_FROM_BASKET':
             basketRef.get().then(docs=>{
               if (docs.exists) {
                 var fetchPro = docs.data();
                 const index = count(fetchPro.products,action.payload.id);
                 if (index > -1) {
                   if (fetchPro.products[index].count > 1) {
                     fetchPro.products[index].count = fetchPro.products[index].count - 1;
                   }else{
                     fetchPro.products.splice(index,1);  
                   } 
                 }
               }
               basketRef.set(fetchPro);
             })
             return{
               ...state
             }
         
  		default : return {...state};
  	}
  }
  const [state, dispatch]=useReducer(reducer, initialState);
  return {
  	state,
  	dispatch
  }
}

export default useBasket;
import React from 'react';
import './Book.css';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
const Book = React.forwardRef((props, ref) => {

  return (
    <div
      ref={ref}
      className="book">
      <Link to={{
        pathname: `/product/${props.book.id}`,
      }}>
        <div className="book__container">
          <img src={props.book.book.img} alt="" />
          <div className="book__containerDesc">
            <h3>
              {props.book.book.name}
            </h3>
            <h3 className="book__containerDescAuthor author">
              By: {props.book.book.author}
            </h3>
            <h3 className="book__containerDescPrice">
              Cost: Rs {props.book.book.price}
            </h3>
          </div>
        </div>
      </Link>
      <div className="book__button">
        <Button
          color="primary"
          variant="contained"
          className="book__buttonAdd"
          onClick={() => {
            props.action({
              type: 'ADD_TO_BASKET', payload: {
                price: props.book.book.price,
                id: props.book.id
              }
            })
            props.isAdded(true);
            props.handleClick();
          }
          }>
          Add
         </Button>
        <Button
          color="secondary"
          variant="contained"
          className="book__buttonRemove"
          onClick={() => {
            props.action({
              type: "REMOVE_FROM_BASKET",
              payload: {
                price: props.book.book.price,
                id: props.book.id
              }
            })
            props.isAdded(false);
            props.handleClick();
          }
          }
        >Remove</Button>
      </div>
    </div>
  )
}
)

export default Book;
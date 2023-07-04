import React, { useContext, useEffect, useState } from 'react';
import fire from '../Firebase';
import 'firebase/firestore';
import firebase from 'firebase/app';
import './MyBook.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import UserContext from '../hooks/userContext';
import { Divider } from '@material-ui/core';
const MyBook = (props) => {
  const [book, setMyBook] = useState({});
  const [loading, setLoading] = useState(true);
  const user = useContext(UserContext);
  const myStoreBooks = fire.db.collection("userbooks").doc(user.email);
  const storeImage = fire.storage
  useEffect(() => {
    fire.db.collection('books').doc(props.book).get().then(docs => {
      setMyBook(docs.data());
      setLoading(false);
    });
    return () => {
      setMyBook({});
    }
  }, [props.book])

  const handleDelete = () => {
    setLoading(true);
    fire.db.collection('books').doc(props.book).delete().then(() => {
      myStoreBooks.update({
        books: firebase.firestore.FieldValue.arrayRemove(props.book)
      }).then(() => {
        const refToFile = storeImage.refFromURL(book.img);
        refToFile.delete().then(() => {
          console.log("File Deleted Successfully");
          setLoading(false);
        }).catch(errorFile => {
          console.log(errorFile);
          setLoading(false);
        })
      })
    }).catch(err => {
      console.log(err);
      setLoading(false);
    })
  }

  return !loading && (
    <div className="mybook">
      <img src={book.img} alt={props.book} />
      <div className="mybook__field">
        <p
          className="mybook__name">
          <strong>
            Book Name :
              </strong>
          {book.name}
        </p>
        <p
          className="mybook__price">
          <strong>
            Book Price :
              </strong>
          {book.price}
        </p>
        <p
          className="mybook__price">
          <strong>
            Book Categary :
              </strong>
          {book.category}
        </p>
        <p
          className="mybook__price">
          <strong>
            Book Type:
              </strong>
          {book.type}
        </p>
      </div>
      { loading ?
        <CircularProgress color="secondary" /> :
        <button
          onClick={handleDelete}>
          {"Delete"}
        </button>}
      <Divider />
    </div>
  )
}

export default MyBook;
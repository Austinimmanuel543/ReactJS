import React, { useContext, useEffect } from 'react';
import './BodyMyAccount.css'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles';
import { Container, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@material-ui/core';
import fire from '../Firebase';
import MyBook from '../components/MyBook';
import UserContext from '../hooks/userContext';
import firebase from "firebase/app";
import 'firebase/firestore';
import BounceLoader from "react-spinners/BounceLoader";
import useErrorField from '../hooks/useErrorField';

const BodyMyAccount = (props) => {
  const css =
  {
    display: 'block',
    margin: '0 auto'
  };
  const user = useContext(UserContext);

  const [loading, setLoading] = React.useState(true);
  const [error, handleError] = useErrorField();

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [category, setCategory] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [type, setType] = React.useState('');
  const [img, setImg] = React.useState("");
  const [books, setBooks] = React.useState([]);

  const storeBooks = fire.db.collection("books");
  const myStoreBooks = fire.db.collection("userbooks").doc(user.email);

  const storeImage = fire.storage.ref()
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(5),
      },
    },
  }));
  const BookImage = () => {
    return (
      <div className="body__myAccountImage">
        <img src={URL.createObjectURL(img)} alt={img.name} />
      </div>);
  }

  const handleImage = (e) => {
    setImg(e.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name !== "" &&
      type !== "" &&
      category !== "" &&
      description !== "" &&
      price !== 0 &&
      author !== ""
    ) {
      setLoading(true);
      const myBook = storeImage.child(img.name);
      myBook.put(img).then(snapshot => {
        // Add to the Array of the Books above
        snapshot.ref.getDownloadURL().then(url => {
          const book = {
            name: name,
            type: type,
            category: category,
            description: description,
            price: Number(price),
            author: author,
            img: url
          }
          storeBooks.add(book).then(snap => {
            if (books.length > 0) {
              myStoreBooks.update({
                books: firebase.firestore.FieldValue.arrayUnion(snap.id)
              }).then(res => {
                console.log("Document is update")
              })
            } else {
              myStoreBooks.set({
                books: [snap.id]
              }).then(res => {
                console.log("Document Setted");
              })
            }
          })
          setLoading(false);
        });
      })
    } else {
      handleError('Please specify more data for The Book')
    }

    setName("");
    setImg("");
    setPrice(0);
    setDescription("");
    setType("");
    setAuthor("");
    setCategory("");
  }

  const classes = useStyles();
  useEffect(() => {

    const unsubscribe = fire.db.collection("userbooks").doc(user.email).onSnapshot(doc => {
      if (doc.exists) {
        setBooks(doc.data().books);
        setLoading(false);
      } else {
        setLoading(false)
      }
    })
    return () => {
      unsubscribe();
    }
  }, [user.email]);

  return (
    <div className="body__myAccount">
      <React.Fragment>
        <Container maxWidth="lg">
           <h1>Add Books</h1>
          <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
            <FormControl
              variant="outlined">
              <InputLabel
                htmlFor="name">
                Name
                  </InputLabel>
              <OutlinedInput
                id="name" value={name}
                onChange={(e) => setName(e.target.value)}
                label="Name" />
              <FormHelperText
                id="component-helper-text">
                {"Name Of The Book"}
              </FormHelperText>
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel htmlFor="description">Description</InputLabel>
              <OutlinedInput type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} label="Name" />
              <FormHelperText id="component-helper-text">Description For the Book</FormHelperText>
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel htmlFor="price">Price</InputLabel>
              <OutlinedInput  type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} label="Name" />
              <FormHelperText id="component-helper-text">Price For the Book</FormHelperText>
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel htmlFor="author">Author</InputLabel>
              <OutlinedInput type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} label="Name" />
              <FormHelperText id="component-helper-text">Author For the Book</FormHelperText>
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel htmlFor="type">Type</InputLabel>
              <OutlinedInput type="text" id="type" value={type} onChange={(e) => setType(e.target.value)} label="Name" />
              <FormHelperText id="component-helper-text">Type For the Book</FormHelperText>
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel htmlFor="category">Category</InputLabel>
              <OutlinedInput type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} label="Name" />
              <FormHelperText id="component-helper-text">Category For the Book</FormHelperText>
            </FormControl>
            <label htmlFor="file">Choose a file : </label>
            <input type="file"
              id={'file'}
              className={'inputfile'}
              name="file"
              onChange={handleImage} />
            {
              img && <BookImage />
            }
            <div>
              {loading ?
                <BounceLoader
                  loading={loading}
                  css={css}
                  size={150} /> :
                <button
                  id="smt-button"
                  type="submit">
                  Submit
                           </button>}
            </div>
            {error && <Alert severity="error">{error}</Alert>}
          </form>
        </Container>
      </React.Fragment>
      <div className="body__myAccountMyBooks">
        <React.Fragment>
          <Container maxWidth="lg">
            <h1>
              My Books
    				  </h1>
            {
              loading ?
                <BounceLoader
                  loading={loading}
                  css={css}
                  size={150} /> :
                books.length <= 0 ?
                  <p>{"No Books"}</p> :
                  books.map(book => <MyBook key={book} book={book} />)
            }
          </Container>
        </React.Fragment>
      </div>
    </div>
  )
}

export default BodyMyAccount;
import React, {useEffect} from 'react';
import './Body.css'
import Book from './Book'
import fire from '../Firebase';
import ClipLoader from "react-spinners/ClipLoader";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
const Body = (props) => {
  const ref = React.createRef();
  const [category, setCategory] = React.useState('');
  const [categories, setCategories]=React.useState([]);
  const [books, setBooks]=React.useState([]);
  const [loading , setLoading]=React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage]=React.useState(true);
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const css = {
    'display': 'flex',
    'margin': 'auto',
  }
  useEffect(()=>{
    const key="category";
    fire.db.collection('books').get().then(snapshot=>{
      setBooks(snapshot.docs.map(book=>{
        return {
          id : book.id,
          book: book.data()
        }
      }));
      setCategories([...new Map(snapshot.docs.map(book=>[book.data()[key],book.data()])).values()]) 
      setLoading(false);
    })
  },[])
  
    return loading ? 
    <ClipLoader color={"black"} css={css} loading={loading} size={150} /> 
    :
     (
      <div className="body">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            ref={ref}
            elevation={6} 
            variant="filled" 
            onClose={handleClose} 
            severity={message ? 
                      "success" : 
                      "error"}>
          {message ? 
            "Added to Basket" : 
            "Removed From Basket"}
        </Alert>
      </Snackbar>
      	<div className="body__filter">
      		<div className="body__filterCategory">
            <label htmlFor="category">Category : </label>
  	        <select
  	          id="category"
  	          value={category}
  	          onChange={handleChange}
  	        >
            <option  key={0} value={''}>{"All"}</option>
  			{

  				categories.map((cate, index)=>(
  						<option  key={index + 1} value={cate.category}>{cate.category}</option>))
  			}
  	        </select>
          </div>
      	</div>
      
              <div className="body__normalBody">
            {
               category === ''  ?  books.map(book=>{
                 return book.book.name.includes(props.search) 
                 && 
                 <Book 
                       isAdded={setMessage}
                       key={book.id}  
                       book={book}
                       handleClick={handleClick} 
                       action={props.dispatch}/>
                   }) : 
               books.map(book=>(
                category === book.book.category &&
                  <Book 
                        isAdded={setMessage}
                        handleClick={handleClick}
                        key={book.id} 
                        book={book}
                        action={props.dispatch}/>  
                ))
            }
            </div>
       
      </div>
    )
  }


export default Body;
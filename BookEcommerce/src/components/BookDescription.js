import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import './BookDescription.css';
import ClipLoader from "react-spinners/ClipLoader";
import fire from '../Firebase';
const BookDescription = (props) => {
	let {bookId} = useParams();
	const [book, setBook] = useState({});
	const [loading, setLoading]=useState(true); 
	useEffect(()=>{
		fire.db.collection('books').doc(bookId).get().then(doc=>{
			setBook(doc.data());
			setLoading(false);
		}).catch(err=>{
			console.log(err);
		})
	}, [bookId])
	const css = {
    'display': 'flex',
    'margin': 'auto',
  }
	return loading ? 
		<ClipLoader color={"black"} css={css} loading={loading} size={150} /> :  
		(
		<div className="bookdescription">
			<div className="bookdescription__title">
				<img src={book.img} alt={bookId} />
				<h1>{book.name}</h1>
			</div>
			<h3>Author : {book.author}</h3>
			<p>
				{book.description}
			</p>
			<h3>Price : {book.price}</h3>
			<h3>Type : {book.type}</h3>
			<h3>Categary :{book.category}</h3>
		</div>
	)
}

export default BookDescription;
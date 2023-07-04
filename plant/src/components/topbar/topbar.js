import { useContext, useEffect, useState } from 'react'
import { Nav, Navbar, Image,Dropdown,DropdownButton } from 'react-bootstrap'
import { CartWidget } from '../cartWidget/cartWidget'
import { WishListWidget } from '../wishListWidget/wishListWidget'
import { NavLink, Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { CartContext } from '../../context/cartContext'
import { getFirestore } from '../../firebase'
import logo from "../../assets/logo2.png"
import 'bootstrap/dist/css/bootstrap.min.css'
import './topbar.css';
import { category } from "../../MasterData/Plants"
import { useHistory } from "react-router";
import { USER_LOGIN_RESET } from "../../Store/Constants/AuthConstants"


export const Topbar = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const { quantity } = useContext(CartContext)
	const [categories, setCategories] = useState([])

	useEffect(() => {
		const db = getFirestore()
		const ItemCollection = db.collection('categories').orderBy('name')
		ItemCollection
			.get()
			.then((querySnapshot) => {
				if (querySnapshot.size !== 0) {
					const data = querySnapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data()
					}))
					setCategories(data)
				}
			}
			)
	}, [])

	window.onscroll = () => {
		const nav = document.querySelector('#topbar');
		if (window.scrollY <= 0)
			nav.style = 'background-color:transparent;backdrop-filter: blur(0px)!important;';
		else
			nav.style = `background-color:rgba(255, 255, 255, ${(window.scrollY / window.innerHeight) * 3});box-shadow: -1px 1px 40px 3px rgba(231,231,231,0.6);border-bottom: solid rgba(0,0,0,0.05) 1px;backdrop-filter: blur(10px);`;
	}

	const handleLogout = () => {
		localStorage.removeItem('userInfo');
		dispatch({ type: USER_LOGIN_RESET })
		history.push('/login')
	}
	const handleLogin = () => {
		
		history.push('/login')
	}

	const handleAboutUS =()=>{
		history.push('/aboutus')
	}

	const handleContactUS =()=>{
		history.push('/contact')
	}

	const handleFeedback =()=>{
		history.push('/feedback')
	}
	return (
		<header>
			<Navbar id="topbar" expand="sm" fixed="top">
				<div className="container">
					<Navbar.Brand>
						<Link to='/'>
							<Image src={logo} fluid className="logo" />
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<DropdownButton id="dropdown-basic-button" title="Plant">
					{category.map((cat) => (
								<Dropdown.Item href={`/category/${cat.name}`}  activeClassName="linkCategoryActive">
								{cat.display_name}
								</Dropdown.Item>
							))}
						{/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
						<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
						<Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
						</DropdownButton>
					<Navbar.Collapse id="basic-navbar-nav"style={{marginLeft:"40%"}} className="cus_nav">
						{/* <Nav className="mr-auto">
							{category.map((cat) => (
								<NavLink to={`/category/${cat.name}`} className="linkCategory" activeClassName="linkCategoryActive" key={cat.name}>
									<p key={cat.name}>{cat.display_name}</p>
								</NavLink>
							))}
						</Nav> */}
						<WishListWidget />
						<CartWidget quantity={quantity} />
						<p className="mt-3 mr-3 nav_hover" onClick={handleLogin} style={{ cursor: "pointer" }}>Login</p>
						<p className="mt-3 mr-3 nav_hover" onClick={handleFeedback} style={{ cursor: "pointer" }}>Feedback</p>
						<p className="mt-3 mr-3 nav_hover" onClick={handleContactUS} style={{ cursor: "pointer" }}>Contact US</p>
						<p className="mt-3 mr-3 nav_hover" onClick={handleAboutUS} style={{ cursor: "pointer" }}>About Us</p>
						<p className="mt-3 nav_hover" onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</p>
					</Navbar.Collapse>
				</div>
			</Navbar>
		</header >
	)
}

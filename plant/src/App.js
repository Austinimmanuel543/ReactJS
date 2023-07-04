import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Home } from './views/home/home'
import { LoginForm } from './components/accountBox/loginForm'
import { SignupForm } from './components/accountBox/signupForm'
import { Aboutus} from './components/aboutas/aboutas'
import { ItemDetailContainer } from './views/itemDetailContainer/itemDetailContainer';
import { Cart } from './views/cart/cart';
import { Orders } from './views/orders/orders';
import { ItemListContainer } from './components/itemListContainer/itemListContainer';
import { ScrollToTop } from './components/scrollToTop/scrollToTop';
import { Topbar } from './components/topbar/topbar';
import { Footer } from './components/footer/footer';
import { CartProvider } from './context/cartContext';
import { WishListProvider } from './context/wishListContext';
import { Notice } from './components/notice/notice';
import  Contact from "./components/ContactUs/Contact"
import Feedback from "./components/Feedback/Feedback"
import ProtectedRoute from './privateRoute/privateRoutes';

import store from "./Store/Store";
import { Provider } from "react-redux";

function App() {
	document.title = "online plant management system";
	return (
		<div>
			<Provider store={store}>

				<CartProvider>
					<WishListProvider>
						<BrowserRouter>
							<ScrollToTop />
							<Topbar />
							<Switch>
								{/* <Route exact path='/'>
									<Home />
								</Route> */}
								<Route exact path="/" component={Home} />

								<Route exact path='/login'>
									<LoginForm />
								</Route>
								<Route exact path='/signup'>
									<SignupForm />
								</Route>
								<Route exact path='/aboutus'>
									<Aboutus/>
								</Route>
								<Route exact path='/contact'>
									<Contact/>
								</Route>
								<Route exact path='/feedback'>
									<Feedback/>
								</Route>
								<Route exact path='/item/:id'>
									<ItemDetailContainer />
								</Route>
								<Route exact path='/category/:category'>
									<ItemListContainer />
								</Route>
								<Route exact path='/cart'>
									<Cart />
								</Route>
								<Route exact path='/orders/:orderId'>
									<Orders />
								</Route>
								<Route exact path='/orders'>
									<Orders />
								</Route>
								<Route>
									<Notice header="404 Not found" buttons={[{ text: 'Go to Home', link: '/' }]} />
								</Route>
							</Switch>
							<Footer />
						</BrowserRouter>
					</WishListProvider>
				</CartProvider>
			</Provider>

		</div>
	)
}

export default App;

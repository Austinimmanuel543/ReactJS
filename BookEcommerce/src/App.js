import './App.css';
import BodyMyAccount from './components/BodyMyAccount';
import React, { useState, useEffect } from 'react';
import BookDescription from './components/BookDescription';
import Nav from './components/Nav';
import Body from './components/Body'
import useBasket from './hooks/useBasket'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import useSearchInput from './hooks/useSearchInput';
import Authentication from './components/Authentication';
import Cart from './components/Cart'
import UserContext from './hooks/userContext';
import fire from './Firebase';
import firebase from 'firebase/app';
import "firebase/auth";
import Checkout from './components/Checkout';
import SignUp from './components/SignUp';
function App() {

  const { search, handleSearch } = useSearchInput();
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const handleAuth = () => {

    if (auth) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }
  useEffect(() => {

    if (localStorage.getItem('user') != null) {
      setUser(JSON.parse(localStorage.getItem('user')));
      setAuth(true);
    }
    const unsubscribe = firebase.auth().onAuthStateChanged(userItem => {
      if (userItem) {
        setUser(userItem);
        localStorage.setItem('user', JSON.stringify({
          email: userItem.email,
          uid: userItem.uid,
          refreshToken: userItem.refreshToken
        }))
      } else {
        localStorage.removeItem('user');
        setAuth(false);
        setUser({});
        setCart([]);
      }
    })
    const unSubscribeToCart = fire.db.collection('cart').doc(user.email).onSnapshot(doc => {
      doc.exists && setCart(doc.data().products);
    })
    return () => {
      unsubscribe();
      unSubscribeToCart()
      setAuth(false);
      setUser({});
      setCart([]);
    }
  }, [user.email])

  const { dispatch } = useBasket(user);
  return (
    <Router>
      <div className="app">

        <Switch>
          <Route exact path="/myaccount">
            <UserContext.Provider
              value={user}>
              <React.Fragment>
                <Nav
                  cartLength={cart.length}
                  isCart={true}
                  search={search}
                  setUser={setUser}
                  handleAuth={handleAuth}
                  handleSearch={handleSearch} />
                <BodyMyAccount />
              </React.Fragment>
            </UserContext.Provider>
          </Route>
          <Route exact path="/product/:bookId">
            <UserContext.Provider value={user}>
              <React.Fragment>
                <Nav
                  cartLength={cart.length}
                  isCart={true}
                  search={search}
                  setUser={setUser}
                  handleAuth={handleAuth}
                  handleSearch={handleSearch} />
                <BookDescription />
              </React.Fragment>
            </UserContext.Provider>
          </Route>

          <Route exact path="/cart">
            {
              user ?
                <UserContext.Provider value={user}>
                  <Cart
                    isCart={true}
                    cartLength={cart.length}
                    search={search}
                    setUser={setUser}
                    handleAuth={handleAuth}
                    handleSearch={handleSearch}
                  />
                </UserContext.Provider>
                : <Redirect to="/sign" />
            }
          </Route>
          <Route exact path="/">
            {auth ?
              <UserContext.Provider value={user}>
                <React.Fragment>
                  <Nav
                    cartLength={cart.length}
                    isCart={false}
                    search={search}
                    setUser={setUser}
                    handleAuth={handleAuth}
                    handleSearch={handleSearch} />
                  <Body dispatch={dispatch}
                    search={search} />
                </React.Fragment>
              </UserContext.Provider>
              : <Redirect to="/sign" />}
          </Route>
          <Route exact path="/sign">
            {auth ?
              <Redirect to="/" /> :
              <Authentication
                handleAuth={handleAuth} />}
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/checkout">
            <Checkout cart={cart} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
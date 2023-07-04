import React, { useContext } from 'react';
import './Nav.css'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton'
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core'
import UserContext from '../hooks/userContext';
import useAuthentication from '../hooks/useAuthentication';
import MenuBookIcon from '@material-ui/icons/MenuBook';
const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}))

const Nav = (props) => {
  const history = useHistory();
  const { logOut } = useAuthentication(props.handleAuth);
  const classes = useStyles();
  const user = useContext(UserContext);



  const logOutME = (e) => {
    logOut();
  }


  const pushToHome = () => {
    history.push("/");
  }
  const placeTheCart = () => {
    history.push("/cart");
  }
  const moveToMyBooks = () => {
    history.push("/myaccount");
  }

  const [displayNav, setDisplayNav] = React.useState(false);
  return (
    <div className="nav__master">
      <div className="nav">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Closed_Book_Icon.svg/1200px-Closed_Book_Icon.svg.png" alt="book" />
        {!props.isCart &&
          <input
            placeholder={"Enter a book to search"}
            value={props.search}
            onChange={props.handleSearch}
            type="text" />}
        <IconButton id="displayNav" onClick={() => {
          setDisplayNav(prev => !prev);
        }}>
          <Badge color="secondary" badgeContent={props.cartLength}>
            <ShoppingCartIcon
              fontSize="small"
              className={classes.small} />
          </Badge>
        </IconButton>
        <div className="nav__links">
          <div className="nav__linksButton">
            <IconButton onClick={pushToHome}>
              <HomeIcon
                fontSize="small"
                className={classes.small} />
            </IconButton>
          </div>
          <div className="nav__linksButton">
            <IconButton
              onClick={placeTheCart}>
              <Badge
                fontSize="large"
                color="secondary"
                badgeContent={props.cartLength}>

                <ShoppingCartIcon
                  fontSize="small"
                  className={classes.small} />
              </Badge>
            </IconButton>
          </div>
          <div
            className="nav__linksButton">
            <IconButton
              onClick={moveToMyBooks}>
              <MenuBookIcon
                fontSize="small"
                className={classes.small} />
            </IconButton>
          </div>
          <div
            className="nav__linksButton">
            <span className="nav__linksEmail">{user.displayName ? user.displayName : user.email}</span>
            <div
              onClick={logOutME}
              className="nav__linksLogout">
              Logout
            </div>
          </div>
        </div>
      </div>
      {displayNav &&
        <div className="nav__linksMobileIcon">
          <ul className="nav__linksMobileList">
            <li>
              <a href="/">
                Home
              </a>
            </li>
            <li>
              <a href="/myaccount">
                My Books</a>
            </li>
            <li>
              <a href="/cart">
                Cart</a></li>
            <li onClick={logOutME}>Logout</li>
          </ul>
        </div>
      }
    </div>
  )
}

export default Nav;
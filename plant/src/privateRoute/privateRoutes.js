import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router";
import { logout } from "../Store/Actions/AuthActions";
import { useJwt } from "react-jwt";




const PrivateRoute = ({ component: Component, ...rest }) => {
	const userInfo = useSelector((state) => state.userData.userInfo);
	const dispatch = useDispatch();
	const history = useHistory();
	const token = userInfo && userInfo.token;
	const { decodedToken, isExpired } = useJwt(token);
	const logOut = useSelector(state => state.userLogOut.loginInfo);

	if (!userInfo) {
		history.push('/login')
	}

	if (userInfo && isExpired) {
		dispatch(logout());
		history.push('/login')

	}

	useEffect(() => {
		if (logOut && logOut.success) {
			history.push('/login')
			// dispatch({ type: USER_LOGOUT_RESET });
		}
	}, [logOut])

	return <Route {...rest} render={(props) => (
		// <TemplateContextProvider>

		<Component {...props} />
		// </TemplateContextProvider>

	)}
	/>
};
export default PrivateRoute;

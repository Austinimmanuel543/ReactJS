import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { useHistory } from "react-router";
import { useJwt } from "react-jwt";
import { ADMIN_LOGIN_RESET } from "../Store/Constants/adminConstants";



const AdminRoute = ({ component: Component, ...rest }) => {
	const adminInfo = useSelector((state) => state.adminData.adminInfo);
	const dispatch = useDispatch();
	const history = useHistory();
	const token = adminInfo && adminInfo.token;
	const { decodedToken, isExpired } = useJwt(token);


	if (isExpired) {
		dispatch({
			type: ADMIN_LOGIN_RESET
		});
		localStorage.removeItem('adminInfo')
	}

	useEffect(() => {
		if (adminInfo === null) {
			history.push("/admin/login");
		}
	}, [adminInfo]);


	return <Route {...rest} render={(props) => (
		<Component {...props} />
	)}
	/>
};
export default AdminRoute;

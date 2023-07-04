import axios from 'axios'
import {
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT_REQUEST,
	USER_LOGOUT_SUCCESS,
	USER_LOGOUT_FAIL,
	USER_SSO_REQUEST,
	USER_SSO_SUCCESS,
	USER_SSO_FAIL,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAIL
} from '../Constants/AuthConstants'


const baseUrl = process.env.REACT_APP_API_URL;




export const logout = () => async (dispatch, getState) => {
	try {

		dispatch({
			type: USER_LOGOUT_REQUEST,
		})

		const {
			userData: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		const { data } = await axios.post(`${baseUrl}/api/logout`, {}, config)
		dispatch({
			type: USER_LOGOUT_SUCCESS,
			payload: data,

		})
		dispatch({
			type: USER_LOGOUT,
			payload: data
		})

		localStorage.removeItem('userInfo')
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		dispatch({
			type: USER_LOGOUT_FAIL,
			payload: message,
		})
	}


}


export const login = (account, secretCode) => async (dispatch) => {
	try {
		// dispatch({
		// 	type: LOADING_REQUEST,
		// 	loading: true
		// });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const { data } = await axios.post(
			`${baseUrl}/api/login`,
			{ "email": account, "password": secretCode },
			config
		)

		const userInfo = {
			token: data.token,
			user: data.data
		}
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: userInfo,
		})
		localStorage.setItem('userInfo', JSON.stringify(userInfo))


		// dispatch({
		// 	type: LOADING_SUCCESS,
		// 	loading: false
		// });

	} catch (error) {
		// dispatch({
		// 	type: LOADING_SUCCESS,
		// 	loading: false
		// });
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		})

	}
}



export const userRegister = (name, email, password) => async (dispatch) => {

	try {
		dispatch({
			type: USER_REGISTER_REQUEST,
		})
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const { data } = await axios.post(
			`${baseUrl}/api/register`,
			{ name, email, password, },
			config
		)
		const userInfo = {
			token: data.token,
			user: data.data
		}
		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: userInfo,
		})

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: userInfo,
		})

		localStorage.setItem('userInfo', JSON.stringify(userInfo))
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data
					? error.response.data
					: '',
		})
	}
}

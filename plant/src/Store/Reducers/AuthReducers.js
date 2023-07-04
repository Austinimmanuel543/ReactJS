import {
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,

	USER_LOGOUT_REQUEST,
	USER_LOGOUT_SUCCESS,
	USER_LOGOUT_RESET,
	USER_LOGOUT_FAIL,
	USER_SSO_REQUEST,
	USER_SSO_SUCCESS,
	USER_SSO_FAIL,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAIL,
	FORGOT_PASSWORD_RESET,
	USER_LOGIN_RESET
} from '../Constants/AuthConstants'


export const userLogOutReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGOUT_REQUEST:
			return { loading: true }
		case USER_LOGOUT_SUCCESS:
			return { loading: false, loginInfo: action.payload }
		case USER_LOGOUT_FAIL:
			return { loading: false, error: action.payload }
		case USER_LOGOUT_RESET:
			return { loading: false, loginInfo: {} }
		default:
			return state
	}
}



export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true }
		case USER_REGISTER_SUCCESS:
			return { loading: false, loginInfo: action.payload }
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}


export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true }
		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload }
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload }
		case USER_LOGIN_RESET:
			return { loading: false, userInfo: {} }
		case USER_LOGOUT:
			return { loading: false, userInfo: {} }
		default:
			return state
	}
}

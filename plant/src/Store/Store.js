import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";


import {
	userRegisterReducer,
	userLoginReducer,
	userLogOutReducer,

} from "./Reducers/AuthReducers";



const middleware = [thunk];

const reducer = combineReducers({

	userRegister: userRegisterReducer,
	userData: userLoginReducer,
	userLogOut: userLogOutReducer,
});


const userDataFromStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;
const adminDataFromStorage = localStorage.getItem("adminInfo")
	? JSON.parse(localStorage.getItem("adminInfo"))
	: null;


const initialState = {
	userData: { userInfo: userDataFromStorage },
	adminData: { adminInfo: adminDataFromStorage },
};


const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

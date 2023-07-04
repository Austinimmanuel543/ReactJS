import React, { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userRegister, google, login } from "../../Store/Actions/AuthActions";
import { useHistory } from "react-router";

import {
	BoldLink,
	BoxContainer,
	FormContainer,
	Input,
	MutedLink,
	SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";

export function SignupForm(props) {
	//   const { switchToSignin } = useContext(AccountContext);
	const dispatch = useDispatch();
	const history = useHistory();

	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const loadUserData = useSelector((state) => state.userRegister.loginInfo);


	const handleChange = (e) => {
		setName(e.target.value)
	}
	const handleEmail = (e) => {
		setEmail(e.target.value)
	}

	const handlePassword = (e) => {
		setPassword(e.target.value)
	}

	const handleSubmit = () => {
		dispatch(userRegister(name, email, password))
	}

	useEffect(() => {
		if (loadUserData && loadUserData.token) {
			history.push("/");
		}
	}, [loadUserData]);
	return (
		<BoxContainer>
			<FormContainer>
				<div className="mt-5">
					<Input name="name" type="text" placeholder="Full Name" onChange={handleChange} />
					<Input name="email" type="email" placeholder="Email" onChange={handleEmail} />
					<Input name="password" type="password" placeholder="Password" onChange={handlePassword} />
				</div>
			</FormContainer>
			<Marginer direction="vertical" margin={10} />
			<SubmitButton type="submit" onClick={handleSubmit}>Signup</SubmitButton>
			<Marginer direction="vertical" margin="1em" />
			<MutedLink href="#">
				Already have an account?
				<BoldLink href="/login" >
					Signin
				</BoldLink>
			</MutedLink>
		</BoxContainer>
	);
}

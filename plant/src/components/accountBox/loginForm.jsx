import React, { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { userRegister, google, login } from "../../Store/Actions/AuthActions";

export function LoginForm(props) {
	//   const { switchToSignup } = useContext(AccountContext);
	const dispatch = useDispatch();
	const loadUserData = useSelector((state) => state.userData.userInfo);

	const history = useHistory();

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const handleEmail = (e) => {
		setEmail(e.target.value)
	}

	const handlePassword = (e) => {
		setPassword(e.target.value)
	}

	const handleSubmit = () => {
		dispatch(login(email, password))
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
					<Input name="email" type="email" placeholder="Email" onChange={handleEmail} />
					<Input name="password" type="password" placeholder="Password" onChange={handlePassword} />
				</div>
			</FormContainer>
			<Marginer direction="vertical" margin={10} />
			<MutedLink href="#">Forget your password?</MutedLink>
			<Marginer direction="vertical" margin="1.6em" />
			<SubmitButton type="submit" onClick={handleSubmit} >Signin</SubmitButton>
			<Marginer direction="vertical" margin="1em" />
			<MutedLink href="#">
				Don't have an accoun?{" "}
				<BoldLink href="/signup" >
					Signup
				</BoldLink>
			</MutedLink>
		</BoxContainer>
	);
}

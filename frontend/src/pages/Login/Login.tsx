import { ChangeEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAuth } from "../../providers/AuthProvider";
import Page from "../../templates/Page";
import "./Login.scss";

const Login = () => {
	const { login, user, loginError } = useAuth();
	const [error, setError] = useState("");
	const submitLogin = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form: FormData = new FormData(e.target);
		const formData: any = Object.fromEntries(form.entries());
		if (!formData.email || !formData.password) {
			setError("You must fill out all required fields.");
		} else {
			setError("");
			const response: any =
				login && login(formData.email, formData.password);
			if (response?.error) {
				setError(response.error);
			} else {
				console.log("response", response);
				// e.target.reset();
			}
		}
	};

	if (user?.authId) {
		return <Navigate to="/dashboard" />;
	}

	return (
		<Page>
			<div className="Login">
				{!user?.authId ? (
					<form onSubmit={submitLogin}>
						<h2>Login</h2>
						{error && <p>{error}</p>}
						{loginError && <p>{loginError}</p>}
						<Input
							label="Email"
							name="email"
							placeholder="john@doe.com"
						/>
						<Input
							label="Password"
							name="password"
							type="password"
							placeholder="john@doe.com"
						/>
						<Button type="submit">Login</Button>
					</form>
				) : (
					<Navigate to="/dashboard" />
				)}
			</div>
		</Page>
	);
};

export default Login;

import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import Page from "../../templates/Page";

const Login = () => {
	const navigate = useNavigate();
	const { login, user } = useAuth();
	const [error, setError] = useState("");
	const submitLogin = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form: FormData = new FormData(e.target);
		const formData: any = Object.fromEntries(form.entries());
		if (!formData.email || !formData.password) {
			setError("You must fill out all required fields.");
		} else {
			login && login(formData.email, formData.password);
			setError("");
			e.target.reset();
		}
	};
	if (user?.authId) {
		navigate("/dashboard");
	}
	return (
		<Page className="Login">
			<form onSubmit={submitLogin}>
				{error && <p>{error}</p>}
				<input name="email" placeholder="john@doe.com" />
				<input
					name="password"
					type="password"
					placeholder="john@doe.com"
				/>
				<button type="submit">Login</button>
			</form>
		</Page>
	);
};

export default Login;

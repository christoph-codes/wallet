import { ChangeEvent, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import Page from "../../templates/Page";

const CreateAccount = () => {
	const { login } = useAuth();
	const [error, setError] = useState("");
	const submitLogin = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form: FormData = new FormData(e.target);
		const formData = Object.fromEntries(form.entries());
		if (!formData.email || !formData.password) {
			setError("You must fill out all required fields.");
		} else {
			login && login(formData.email, formData.password);
			setError("");
			e.target.reset();
		}
	};
	return (
		<Page className="CreateAccount">
			<form onSubmit={submitLogin}>
				{error && <p>{error}</p>}
				<input type="text" name="fname" placeholder="John" />
				<input type="text" name="lname" placeholder="Doe" />
				<input type="email" name="email" placeholder="john@doe.com" />
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

export default CreateAccount;

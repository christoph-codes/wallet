import { ChangeEvent, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import Page from "../../templates/Page";

const CreateAccount = () => {
	const { createAccount, user } = useAuth();
	const [error, setError] = useState("");
	const submitLogin = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.target);
		const formData: any = Object.fromEntries(form.entries());
		if (!formData.email || !formData.password) {
			setError("You must fill out all required fields.");
		} else {
			createAccount && createAccount(formData);
			setError("");
			e.target.reset();
		}
	};
	return (
		<Page className="CreateAccount">
			<h2>Logged in user: {user?.fname}</h2>
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

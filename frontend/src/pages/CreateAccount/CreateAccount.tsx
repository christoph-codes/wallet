import { ChangeEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAuth } from "../../providers/AuthProvider";
import Page from "../../templates/Page";
import "./CreateAccount.scss";

const CreateAccount = () => {
	const { createAccount, user, createAccountError } = useAuth();
	const [error, setError] = useState("");
	const submitCreateAccount = (e: ChangeEvent<HTMLFormElement>) => {
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
		<Page>
			<div className="CreateAccount">
				{!user?.authId ? (
					<form onSubmit={submitCreateAccount}>
						<h2>Create Account</h2>
						{error && <p>{error}</p>}
						{createAccountError && <p>{createAccountError}</p>}
						<Input
							label="First Name"
							type="text"
							name="fname"
							placeholder="John"
						/>
						<Input
							label="Last Name"
							type="text"
							name="lname"
							placeholder="Doe"
						/>
						<Input
							label="Email"
							type="email"
							name="email"
							placeholder="john@doe.com"
						/>
						<Input
							label="Password"
							name="password"
							type="password"
							placeholder="**********"
						/>
						<Input
							label="Confirm Password"
							name="confirmPassword"
							type="password"
							placeholder="**********"
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

export default CreateAccount;

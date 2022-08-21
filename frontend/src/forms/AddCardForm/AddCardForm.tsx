import { ChangeEvent, useState } from "react";
import Button from "../../components/Button";
import CardArt from "../../components/CardArt/CardArt";
import Input from "../../components/Input";
import Row from "../../components/Row";
import { db } from "../../config/server";
import { useAuth } from "../../providers/AuthProvider";
import "./AddCardForm.scss";

const AddCardForm = () => {
	const { user } = useAuth();
	const [error, setError] = useState("");
	const issuers = ["visa", "mastercard", "discover", "amex", "jcb"];
	const addCard = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		const form: FormData = new FormData(e.target);
		const formData: any = Object.fromEntries(form.entries());
		if (Object.values(formData).every((x) => x === "")) {
			setError("You must fill out all required fields.");
		} else {
			const payload = {
				card: formData,
				userId: user?.entityId,
			};
			db.post("/cards/add", payload).then(console.log);
			setError("");
			e.target.reset();
		}
	};
	return (
		<form className="AddCardForm" onSubmit={addCard}>
			<Row className="AddCardForm__card_row" align="center">
				<div>
					<h2>Add A Card</h2>
					{error && <p className="errorText">{error}</p>}
				</div>
				<CardArt issuer="visa" bgColor="red" />
			</Row>
			<Row>
				<Input
					name="cardName"
					label="Card Name"
					placeholder="Credit One Bank"
				/>
				<label htmlFor="issuer">
					<span>Issuer</span>
					<select name="issuer" placeholder="Visa">
						{issuers.map((is, index) => (
							<option key={index} value={is}>
								{is}
							</option>
						))}
					</select>
				</label>
				<Input name="issuer" label="Issuer" placeholder="Visa" />
			</Row>
			<Row>
				<Input
					name="lastFour"
					maxlength="4"
					type="tel"
					label="Last Four of Card Number"
					placeholder="Last Four"
				/>
				<Input
					name="expirationDate"
					label="Expiration Date"
					maxlength={4}
					maxLength={4}
					placeholder="06/27"
				/>
				<Input
					name="securityCode"
					label="Security Code"
					maxlength={3}
					maxLength={3}
					placeholder="157"
				/>
			</Row>
			<Row>
				<Input
					name="availableBalance"
					type="tel"
					label="Available Balance"
					placeholder="1200"
				/>
				<Input
					name="creditLimit"
					label="Credit Limit"
					type="tel"
					placeholder="10,000"
				/>
			</Row>
			<Button type="submit">Add Card</Button>
		</form>
	);
};

export default AddCardForm;

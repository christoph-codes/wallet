import { ChangeEvent, useState } from "react";
import Button from "../../components/Button";
import CardArt from "../../components/CardArt/CardArt";
import Input from "../../components/Input";
import Row from "../../components/Row";
import { db } from "../../config/server";
import { ICard } from "../../pages/Dashboard/Dashboard";
import { useAuth } from "../../providers/AuthProvider";
import { validateCreditCardNumber } from "../../utils/helpers";
import "./AddCardForm.scss";

const AddCardForm = () => {
	const { user } = useAuth();
	const [error, setError] = useState("");
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
	const [cardDetails, setCardDetails] = useState<ICard>({});
	const updateForm = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCardDetails({
			...cardDetails,
			[name]: value,
		});
	};
	return (
		<div className="AddCardForm">
			<h2>Add A Card</h2>
			<div className="AddCardForm__container">
				<div className="AddCardForm__card_container">
					<CardArt data={cardDetails} />
					{cardDetails?.balance && <h3>{cardDetails?.balance}</h3>}
					{cardDetails.limit && <span>{cardDetails.limit}</span>}
				</div>
				<form onSubmit={addCard}>
					{error && <p className="errorText">{error}</p>}
					<Row>
						<Input
							name="name"
							label="Card Nickname"
							placeholder="Credit One Bank"
							onChange={updateForm}
						/>
						<Input
							name="bgColor"
							label="Card Color"
							placeholder="#d7f300"
							onChange={updateForm}
							type="color"
						/>
					</Row>
					<Input
						name="lastFour"
						maxlength={16}
						type="tel"
						label="16 Digita Card Number"
						placeholder="Last Four"
						onChange={updateForm}
						onBlur={(e: ChangeEvent<HTMLInputElement>) =>
							setCardDetails({
								...cardDetails,
								issuer: validateCreditCardNumber(
									e.target.value
								),
							})
						}
					/>
					<Row>
						<Input
							name="expirationDate"
							label="Expiration Date"
							maxlength={4}
							maxLength={4}
							placeholder="06/27"
							onChange={updateForm}
						/>
						<Input
							name="cvv"
							label="Security Code"
							maxlength={3}
							maxLength={3}
							placeholder="157"
							type="tel"
							onChange={updateForm}
						/>
					</Row>
					<Row>
						<Input
							name="balance"
							type="tel"
							label="Available Balance"
							placeholder="1200"
							onChange={updateForm}
						/>
						<Input
							name="limit"
							label="Credit Limit"
							type="tel"
							placeholder="10,000"
							onChange={updateForm}
						/>
					</Row>
					<Button type="submit">Add Card</Button>
				</form>
			</div>
		</div>
	);
};

export default AddCardForm;

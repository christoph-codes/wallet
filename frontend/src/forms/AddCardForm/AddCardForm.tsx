import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
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
	const navigate = useNavigate();
	const { user } = useAuth();
	const [error, setError] = useState("");
	const addCard = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		if (Object.values(cardDetails).every((x) => x === "")) {
			setError("You must fill out all required fields.");
		} else {
			const payload = {
				card: {
					name: cardDetails.name,
					bgColor: cardDetails.bgColor,
					lastFour: cardDetails.lastFour,
					expirationDate: cardDetails.expirationDate,
					cvv: cardDetails.cvv,
					balance: Number(cardDetails.balance),
					limit: Number(cardDetails.limit),
					issuer: cardDetails.issuer,
				},
				userId: user?.entityId,
			};
			db.post("/cards/add", payload)
				.then((response) => {
					setError("");
					e.target.reset();
					navigate("/dashboard");
				})
				.catch(console.log);
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
	console.log("limit:", typeof cardDetails.limit);
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
							defaultValue="#d7f300"
						/>
					</Row>
					<Input
						name="lastFour"
						maxLength={16}
						type="tel"
						label="16 Digit Card Number"
						placeholder="Last Four"
						onChange={updateForm}
						value={cardDetails.lastFour?.replace(/\D/g, "")}
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
							maxLength={4}
							placeholder="06/27"
							onChange={updateForm}
						/>
						<Input
							name="cvv"
							label="Security Code"
							maxLength={3}
							placeholder="157"
							type="tel"
							onChange={updateForm}
						/>
					</Row>
					<Row>
						<Input
							name="balance"
							type="number"
							label="Available Balance"
							placeholder="1200"
							onChange={updateForm}
						/>
						<Input
							name="limit"
							label="Credit Limit"
							type="number"
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

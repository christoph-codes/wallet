import axios from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import CCard from "../../components/CCard";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import { db } from "../../config/server";
import { useAuth } from "../../providers/AuthProvider";
import DashboardTemplate from "../../templates/Dashboard";
import "./Dashboard.scss";

export interface ICard {
	name?: string;
	issuer?: "visa" | "mastercard" | "discover" | "amex";
	limit?: number;
	balance?: number;
	dueDate?: Date;
	expirationDate?: string;
	lastFour?: string;
}

const Dashboard = () => {
	const { user } = useAuth();
	const [usersCards, setUsersCards] = useState<ICard[] | null>(null);
	/**
	 * Getting a users cards
	 */
	useEffect(() => {
		const unsubscribe = async () => {
			return await db
				.post("/cards", { userId: user?.entityId })
				.then((cards) => {
					console.log("getCards getter:", cards.data);
					setUsersCards(cards.data);
				})
				.catch(console.log);
		};
		unsubscribe();
	}, [user?.entityId]);

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
	return (
		<DashboardTemplate className="Dashboard" user={user}>
			<h1 className="Dashboard__available_balance">
				<sup>$</sup>
				{!usersCards
					? Number(0).toFixed(2)
					: usersCards?.length.toFixed(2)}
				<span>Total Available Balance</span>
			</h1>
			{usersCards ? (
				<section className="Dashboard__cards">
					{usersCards.length >= 1 ? (
						usersCards?.map((card, index) => {
							return <CCard key={index} card={card} />;
						})
					) : (
						<div className="Dashboard__empty_cards">
							<p>No Cards Have been added. Add one now!</p>
							<Modal
								buttonVariant="primary-outline"
								buttonLabel="Add Card"
							>
								<h1>Hello World</h1>
								<form onSubmit={addCard}>
									{error && (
										<p className="errorText">{error}</p>
									)}
									<Input name="cardName" label="Card Name" />
									<Input
										name="lastFour"
										maxlength="4"
										type="tel"
										label="Last Four of Card Number"
										placeholder="Last Four"
									/>
									<Input name="cardName" label="Card Name" />
									<Button type="submit">Add Card</Button>
								</form>
							</Modal>
						</div>
					)}
				</section>
			) : (
				"...Loading"
			)}
		</DashboardTemplate>
	);
};

export default Dashboard;

import { useEffect, useState } from "react";
import CCard from "../../components/CCard";
import Modal from "../../components/Modal";
import { db } from "../../config/server";
import AddCardForm from "../../forms/AddCardForm";
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
	cvv?: string;
	bgColor?: string;
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
								<AddCardForm />
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

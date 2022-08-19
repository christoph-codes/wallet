import { useEffect, useState } from "react";
import CCard from "../../components/CCard";
import { ICreditCard } from "../../components/CCard/CCard";
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
	const [usersCards, setUsersCards] = useState<ICard[]>([]);
	useEffect(() => 
		 async () => {
			const id = await db.post("/users/get", { authId: user?.authId });
			return await db
				.get("/cards", id)
				.then((cards) => setUsersCards(cards));
		};
	);
	return (
		<DashboardTemplate className="Dashboard" user={user}>
			{usersCards ? (
				<>
					<h1 className="Dashboard__available_balance">
						${usersCards?.length.toFixed(2).toLocaleString()}
						<span>Total Available Balance</span>
					</h1>
					<section className="Dashboard__cards">
						{usersCards?.map((card, index) => {
							return <CCard key={index} card={card} />;
						})}
					</section>
				</>
			) : (
				"...Loading"
			)}
		</DashboardTemplate>
	);
};

export default Dashboard;

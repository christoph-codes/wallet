import AddCardForm from "../../forms/AddCardForm";
import { useAuth } from "../../providers/AuthProvider";
import DashboardTemplate from "../../templates/Dashboard/DashboardTemplate";

const AddCard = () => {
	const { user } = useAuth();
	return (
		<DashboardTemplate className="Dashboard" user={user}>
			<AddCardForm />
		</DashboardTemplate>
	);
};

export default AddCard;

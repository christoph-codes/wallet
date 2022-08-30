import AddCardForm from "../../forms/AddCardForm";
import DashboardTemplate from "../../templates/Dashboard/DashboardTemplate";

const AddCard = () => {
	return (
		<DashboardTemplate className="Dashboard">
			<AddCardForm />
		</DashboardTemplate>
	);
};

export default AddCard;

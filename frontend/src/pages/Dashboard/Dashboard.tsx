import { useAuth } from "../../providers/AuthProvider";
import Page from "../../templates/Page";
import "./Dashboard.scss";

const Dashboard = () => {
	const { user } = useAuth();
	return (
		<Page title="User Dashboard">
			<h1>
				{user?.fname}, {user?.lname}
			</h1>
		</Page>
	);
};

export default Dashboard;

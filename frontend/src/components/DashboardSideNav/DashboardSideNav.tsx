import logo from "../../assets/wallet_logo.svg";
import "./DashboardSideNav.scss";

const DashboardSideNav = () => {
	const links = [
		{
			label: "Dashboard",
			path: "/dashboard",
		},
		{
			label: "Add Card",
			path: "/dashboard/add-card",
		},
	];
	return (
		<aside className="DashboardSideNav">
			<img src={logo} alt="Wallet Logo" />
			<ul>
				{links.map((link, index) => (
					<li key={index}>
						<a href={link.path}>{link.label}</a>
					</li>
				))}
			</ul>
		</aside>
	);
};

export default DashboardSideNav;

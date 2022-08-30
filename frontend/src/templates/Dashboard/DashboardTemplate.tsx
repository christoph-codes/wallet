import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import DashboardHeader from "../../components/DashboardHeader";
import DashboardSideNav from "../../components/DashboardSideNav";
import { useAuth } from "../../providers/AuthProvider";
import "./DashboardTemplate.scss";

export interface IDashboardTemplate {
	children?: ReactNode;
	className?: string;
	title?: string;
}

const DashboardTemplate = ({
	children,
	className,
	title,
}: IDashboardTemplate) => {
	const { user } = useAuth();
	/**
	 * If the user is not authorized it will redirect to the login page.
	 */
	if (!user?.authId) {
		return <Navigate to={"/login"} />;
	}
	return (
		<div className={`DashboardTemplate ${className}`}>
			<DashboardSideNav />
			<div className="DashboardTemplate__container">
				{user && (
					<DashboardHeader name={`${user.fname} ${user.lname}`} />
				)}
				<main>
					{title && (
						<h1 className="DashboardTemplate__title">{title}</h1>
					)}
					{children}
				</main>
			</div>
		</div>
	);
};

export default DashboardTemplate;

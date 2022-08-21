import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import DashboardHeader from "../../components/DashboardHeader";
import DashboardSideNav from "../../components/DashboardSideNav";
import { IUser } from "../../providers/AuthProvider";
import "./DashboardTemplate.scss";

export interface IDashboardTemplate {
	children?: ReactNode;
	className?: string;
	user?: IUser | null;
	title?: string;
}

const DashboardTemplate = ({
	children,
	user,
	className,
	title,
}: IDashboardTemplate) => {
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
						<h3 className="DashboardTemplate__title">{title}</h3>
					)}
					{children}
				</main>
			</div>
		</div>
	);
};

export default DashboardTemplate;

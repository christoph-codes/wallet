import { ReactNode } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import DashboardSideNav from "../../components/DashboardSideNav";
import { IUser } from "../../providers/AuthProvider";
import "./DashboardTemplate.scss";

export interface IDashboardTemplate {
	children?: ReactNode;
	className?: string;
	user?: IUser;
	title?: string;
}

const DashboardTemplate = ({
	children,
	user,
	className,
	title,
}: IDashboardTemplate) => {
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

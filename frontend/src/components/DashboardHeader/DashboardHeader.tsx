import { MouseEvent, useRef, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
// import { useOutsideAlerter } from "../../utils/callbacks";
import "./DashboardHeader.scss";

export interface IDashboardHeader {
	name?: string;
}

const DashboardHeader = ({ name }: IDashboardHeader) => {
	const { logout } = useAuth();
	const dropdownRef = useRef(null);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	// useOutsideAlerter(dropdownRef, () =>
	// 	setDropdownOpen(dropdownOpen && false)
	// );

	const logUserOut = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		logout && logout();
		setDropdownOpen(dropdownOpen && false);
	};
	return (
		<header className="DashboardHeader">
			<button
				className={`DashboardHeader__button ${
					dropdownOpen ? "DashboardHeader__button--open" : ""
				}`}
				ref={dropdownRef}
				onClick={() => setDropdownOpen(!dropdownOpen)}
			>
				{name}
			</button>
			<div
				className={`DashboardHeader__dropdown ${
					dropdownOpen ? "DashboardHeader__dropdown--open" : ""
				}`}
			>
				<ul>
					<li>
						<a href="/dashboard/settings">Settings</a>
					</li>
					<li>
						<button onClick={(e) => logUserOut(e)}>Logout</button>
					</li>
				</ul>
			</div>
		</header>
	);
};

export default DashboardHeader;

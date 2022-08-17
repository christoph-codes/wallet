import { useAuth } from "../../providers/AuthProvider";
import "./Header";

const Header = () => {
	const { user, logout } = useAuth();
	return (
		<header>
			Hello, {user?.fname}
			<div className="actions">
				<a href="/create-account">Create Account</a>
				{` | `}
				<a href="/login">Login</a>
				{` | `}
				<button onClick={() => logout && logout()}>Logout</button>
			</div>
		</header>
	);
};

export default Header;

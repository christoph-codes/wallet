import { useAuth } from "../../providers/AuthProvider";
import walletLogo from "../../assets/wallet_logo.svg";
import "./Header.scss";

const Header = () => {
	const { user, logout } = useAuth();
	return (
		<header className="Header">
			<a href="/">
				<img src={walletLogo} alt="Wallet Logo" />
			</a>
			<nav className="actions">
				{!user?.authId && (
					<>
						<li>
							<a href="/create-account">Create Account</a>
						</li>
						<li>
							<a href="/login">Login</a>
						</li>
					</>
				)}
				{user?.authId && (
					<>
						<li>
							<a href="/dashboard">Dashboard</a>
						</li>
						<li>
							<button onClick={() => logout && logout()}>
								Logout
							</button>
						</li>
					</>
				)}
			</nav>
		</header>
	);
};

export default Header;

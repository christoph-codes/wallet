import walletLogo from "../../assets/wallet_logo_white.svg";
import Button from "../../components/Button";
import "./Home.scss";

const Home = () => {
	return (
		<div className="Home">
			<img src={walletLogo} alt="Wallet Logo" />
			<p>this is where your credit lives.</p>
			<Button variant="white" href="/create-account">
				get started
			</Button>
			<a className="login_link" href="/login">
				already have an account?
			</a>
		</div>
	);
};

export default Home;

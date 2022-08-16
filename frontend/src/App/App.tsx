import { Route, Routes } from "react-router-dom";
import CreateAccount from "../pages/CreateAccount";
import Login from "../pages/Login";
import Home from "../pages/Home";
import "./App.scss";

function App() {
	return (
		<Routes>
			<Route path="/create-account" element={<CreateAccount />} />
			<Route path="/login" element={<Login />} />
			<Route path="/" element={<Home />} />
		</Routes>
	);
}

export default App;

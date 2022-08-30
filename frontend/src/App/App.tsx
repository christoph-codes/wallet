import { Route, Routes } from "react-router-dom";
import CreateAccount from "../pages/CreateAccount";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import AddCard from "../pages/AddCard";
import "./App.scss";

function App() {
	return (
		<Routes>
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/dashboard/add-card" element={<AddCard />} />
			<Route path="/create-account" element={<CreateAccount />} />
			<Route path="/login" element={<Login />} />
			<Route path="/" element={<Home />} />
		</Routes>
	);
}

export default App;

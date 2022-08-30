import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { db } from "../config/server";
import { clearItem, getWithExpiry, setWithExpiry } from "../utils/helpers";

export interface ICreateAccountArgs {
	fname: string;
	lname: string;
	email: string;
	password: string;
}
export interface IUser {
	fname?: string;
	lname?: string;
	email?: string;
	authId?: string;
	cards?: string[];
	entityId?: string;
}

export interface IAuthContext {
	createAccount?: (user: ICreateAccountArgs) => void;
	createAccountError?: string;
	login?: (email: string, password: string) => void;
	loginError?: string;
	logout?: () => void;
	user?: IUser;
}
export interface IAuthProvider {
	children?: ReactNode;
}

const AuthContext = createContext<IAuthContext>({
	createAccount: () => {},
	createAccountError: "",
	login: () => {},
	loginError: "",
	logout: () => {},
	user: {
		fname: "",
		lname: "",
		email: "",
		authId: "",
		cards: [],
		entityId: "",
	},
});

const AuthProvider = ({ children }: IAuthProvider) => {
	const navigate = useNavigate();
	const [user, setUser] = useState(() => {
		const localUser = getWithExpiry("wallet_user");
		return (
			localUser || {
				fname: "",
				lname: "",
				email: "",
				authId: "",
				cards: [],
				entityId: "",
			}
		);
	});

	/**
	 * If there is no user saved in localstorage, then check firebase for a logged in user and save.
	 */
	useEffect(() => {
		auth.onAuthStateChanged((firebaseUser) => {
			if (firebaseUser) {
				db.post(`/users/get`, { authId: firebaseUser?.uid })
					.then((redisUser) => {
						if (redisUser.data) {
							setUser(redisUser.data);
						} else {
							setUser({
								fname: "",
								lname: "",
								email: "",
								authId: "",
								cards: [],
								entityId: "",
							});
						}
					})
					.catch((err) => {
						throw new Error(err);
					});
			} else {
				setUser({
					fname: "",
					lname: "",
					email: "",
					authId: "",
					cards: [],
					entityId: "",
				});
			}
		});
	}, [user?.authId]);

	useEffect(() => {
		setWithExpiry("wallet_user", user, 3600000);
	}, [user]);

	const [loginError, setLoginError] = useState("");

	/**
	 * ### Login Function
	 * A function that takes in a email and password that queries Firebase authentication for their account
	 * @param email `string` in email format associated with the users account
	 * @param password a secret `string` that is associated with the users account
	 */
	const login = (email: string, password: string) => {
		setLoginError("");
		signInWithEmailAndPassword(auth, email, password)
			.then((firebaseUser) => {
				if (firebaseUser) {
					db.post(`/users/get`, { authId: firebaseUser?.user?.uid })
						.then((user) => {
							if (user) {
								setUser(user.data[0]);
								return { success: user.data[0] };
							} else {
								setUser({
									fname: "",
									lname: "",
									email: "",
									authId: "",
									cards: [],
									entityId: "",
								});
								setLoginError("No user found");
							}
						})
						.catch((err) => {
							setLoginError(err);
						});
				} else {
					setUser({
						fname: "",
						lname: "",
						email: "",
						authId: "",
						cards: [],
						entityId: "",
					});
					setLoginError("There is no user with this account info.");
				}
			})
			.catch((err) => {
				setUser({
					fname: "",
					lname: "",
					email: "",
					authId: "",
					cards: [],
					entityId: "",
				});
				setLoginError(err.message);
			});
	};

	const [createAccountError, setCreateAccountError] = useState("");

	const createAccount = (user: ICreateAccountArgs) => {
		setCreateAccountError("");
		const { fname, lname, email, password } = user;
		if (!fname || !lname || !email || !password) {
			throw new Error(
				"You must provide valid credentials to create an account"
			);
		}
		createUserWithEmailAndPassword(auth, email, password)
			.then(async (response) => {
				console.log("response:", response);
				console.log("user:", user);
				await db
					.post("/users/create", {
						user: {
							fname: user.fname,
							lname: user.lname,
							email: response.user.email,
							uid: response.user.uid,
						},
					})
					.then((redisUser) => {
						console.log("redisUser:", redisUser.data);
						setUser(redisUser.data);
					})
					.catch((err) => {
						console.log("failed db user create", err.code);
						setCreateAccountError(err);
					});
			})
			.catch((error) => {
				console.log("firebase create account error", error);
				setCreateAccountError(error.message);
				// throw new Error(error);
			});
	};

	const logout = () => {
		signOut(auth)
			.then((response) => {
				console.log("logging out this user:", response);
				clearItem("wallet_user");
				setUser({
					fname: "",
					lname: "",
					email: "",
					authId: "",
					cards: [],
				});
				navigate("/login");
			})
			.catch((error) => {
				throw new Error(error);
			});
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				createAccount,
				logout,
				createAccountError,
				loginError,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

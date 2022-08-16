import { UserInfo } from "firebase/auth";
import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";
import { auth } from "../config/firebase";

export interface IUser extends UserInfo {
	fname?: string;
	lname?: string;
	cards?: string[];
}

export interface IAuthContext {
	login?: (email: FormDataEntryValue, password: FormDataEntryValue) => void;
	logout?: () => void;
	user?: IUser;
}
export interface IAuthProvider {
	children?: ReactNode;
}

const AuthContext = createContext<IAuthContext>({
	login: () => {},
	logout: () => {},
	user: {
		uid: "",
		fname: "",
		lname: "",
		cards: [],
		displayName: "",
		email: "",
		phoneNumber: "",
		photoURL: "",
		providerId: "",
	},
});

const AuthProvider = ({ children }: IAuthProvider) => {
	const [user, setUser] = useState(() => {
		console.log("current user: ", auth.currentUser);
		return auth.currentUser
			? auth.currentUser
			: {
					uid: "",
					fname: "",
					lname: "",
					cards: [],
					displayName: "",
					email: "",
					phoneNumber: "",
					photoURL: "",
					providerId: "",
			  };
	});

	useEffect(() => {
		auth.onAuthStateChanged((firebaseUser) => {
			if (firebaseUser) {
				setUser(firebaseUser);
			}
		});
	}, []);

	/**
	 * ### Login Function
	 * A function that takes in a email and password that queries Firebase authentication for their account
	 * @param email `string` in email format associated with the users account
	 * @param password a secret `string` that is associated with the users account
	 */
	const login = (email: FormDataEntryValue, password: FormDataEntryValue) => {
		console.log("creds", email, password);
	};

	const logout = () => {
		console.log("logging out this user:", user);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

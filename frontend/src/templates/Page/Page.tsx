import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "./Page.scss";

export interface IPageProps {
	className?: string;
	title?: string;
	description?: string;
	children?: ReactNode;
}

const Page = ({
	className,
	title = "Wallet » A credit card wallet for all of your credit cards.",
	description = "A credit card wallet for all of your credit cards.",
	children,
}: IPageProps) => (
	<>
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
		</Helmet>
		<Header />
		<main className={`Page ${className || ""}`}>{children}</main>
		<Footer />
	</>
);

export default Page;

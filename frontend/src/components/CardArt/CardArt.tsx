import { ICard } from "../../pages/Dashboard/Dashboard";
import {
	SiVisa,
	SiMastercard,
	SiDiscover,
	SiAmericanexpress,
	SiJcb,
} from "react-icons/si";
import "./CardArt.scss";

export interface ICardArt {
	bgColor?: string;
	issuer: ICard["issuer"];
	className?: string;
	[x: string]: any;
}
const CardArt = ({ bgColor, issuer, className }: ICardArt) => {
	const issuerArt = {
		visa: <SiVisa size="32" />,
		mastercard: <SiMastercard size="32" />,
		discover: <SiDiscover size="32" />,
		amex: <SiAmericanexpress size="32" />,
		jcb: <SiJcb size="32" />,
	};
	return (
		<div
			style={{ backgroundColor: bgColor }}
			className={`CardArt ${className || ""}`}
		>
			{issuerArt[issuer as keyof typeof issuerArt]}
		</div>
	);
};

export default CardArt;

import { ICard } from "../../pages/Dashboard/Dashboard";
import {
	SiVisa,
	SiMastercard,
	SiDiscover,
	SiAmericanexpress,
} from "react-icons/si";
import { invertColor } from "../../utils/helpers";
import "./CardArt.scss";

export interface ICardArt {
	className?: string;
	data?: ICard;
	[x: string]: any;
}
const CardArt = ({ data, className }: ICardArt) => {
	const defaultBG = "#4444ff";
	const color = invertColor(data?.bgColor || defaultBG);
	const issuerLogoSize = 64;
	const issuerArt = {
		visa: <SiVisa color={color} size={issuerLogoSize} />,
		mastercard: <SiMastercard color={color} size={issuerLogoSize} />,
		discover: <SiDiscover color={color} size={issuerLogoSize} />,
		amex: <SiAmericanexpress color={color} size={issuerLogoSize} />,
	};
	console.log("issuer", data?.issuer);
	return (
		<div
			style={{ backgroundColor: data?.bgColor || defaultBG }}
			className={`CardArt ${className || ""}`}
		>
			<div className="CardArt__container">
				<h1 className="CardArt__numbers" style={{ color: color }}>
					{data?.lastFour?.substring(data?.lastFour?.length - 4)}
					<span>{data?.name}</span>
				</h1>
				<div className="CardArt__details" style={{ color: color }}>
					{data?.expirationDate && (
						<>
							<p>
								Exp:{" "}
								<strong>
									{data?.expirationDate?.substring(2, 0) +
										"/" +
										data?.expirationDate?.substring(
											2,
											data?.expirationDate?.length
										)}
								</strong>
							</p>
							<p>
								CVV: <strong>{data?.cvv}</strong>
							</p>
						</>
					)}
				</div>
				{issuerArt[data?.issuer as keyof typeof issuerArt]}
			</div>
		</div>
	);
};

export default CardArt;

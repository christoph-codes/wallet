import { ICard } from "../../pages/Dashboard/Dashboard";
import { invertColor, numberToCurrency } from "../../utils/helpers";
import Button from "../Button";
import CardArt from "../CardArt";
import "./CCard.scss";

export interface ICCard {
	card?: ICard;
	className?: string;
}

const CCard = ({ className, card }: ICCard) => {
	const color = card?.bgColor
		? invertColor(card?.bgColor)
		: invertColor("#1042E6");
	return (
		<article className="CCard">
			<div
				style={{
					backgroundColor: card?.bgColor || "#1042E6",
					color: color,
				}}
				className="CCard__bg"
			>
				<h3 style={{ color: color }}>
					<sup>$</sup>
					{card?.balance && numberToCurrency(card?.balance)}
					<span>Available Balance</span>
				</h3>
			</div>
			<div className="CCard__content">
				<CardArt data={card} />
				<Button className="CCard__cta">View Card</Button>
			</div>
		</article>
	);
};

export default CCard;

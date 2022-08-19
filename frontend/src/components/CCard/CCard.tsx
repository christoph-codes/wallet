import "./CCard.scss";

export interface ICreditCard {
	name?: string;
	availableBalance?: number;
	art?: string;
}

export interface ICCard {
	card?: ICreditCard;
	className?: string;
}

const CCard = ({ className, card }: ICCard) => {
	return (
		<article className="CCard">
			<div className="CCard__bg">
				<h3>
					{card?.availableBalance?.toFixed(2)}
					<span>Available Balance</span>
				</h3>
			</div>
			<img src={card?.art} alt={card?.name} />
			<button className="CCard__cta">View</button>
		</article>
	);
};

export default CCard;

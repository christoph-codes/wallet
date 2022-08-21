import { ReactNode } from "react";
import "./Row.scss";

export interface IRow {
	align?: "start" | "center" | "end";
	justify?: "center" | "between" | "end";
	className?: string;
	children?: ReactNode;
	[x: string]: any;
}

const Row = ({ align, justify, className, children, ...rest }: IRow) => {
	return (
		<div
			className={`Row ${className || ""} ${
				align ? `Row__align__${align}` : ""
			} ${justify ? `Row__justify__${justify}` : ""}`}
			{...rest}
		>
			{children}
		</div>
	);
};

export default Row;

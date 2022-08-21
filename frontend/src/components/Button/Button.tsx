import { HTMLAttributes, ReactNode } from "react";
import "./Button.scss";

export interface IButton
	extends HTMLAttributes<HTMLButtonElement & HTMLAnchorElement> {
	href?: string;
	className?: string;
	variant?:
		| "primary"
		| "primary-outline"
		| "secondary"
		| "secondary-outline"
		| "white"
		| "white-outline"
		| "ghost"
		| "ghost-outline";
	children: ReactNode;
	[x: string]: any;
}

const Button = ({
	href,
	className,
	variant = "primary",
	children,
	...rest
}: IButton) => {
	const Tag: any = href ? "a" : "button";
	return (
		<Tag
			href={href}
			className={`Button Button__${variant} ${className || ""}`}
			{...rest}
		>
			<>{children}</>
		</Tag>
	);
};

export default Button;

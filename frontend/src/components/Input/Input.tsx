import "./Input.scss";

export interface IInput {
	label?: string;
	name: string;
	className?: string;
	inputClass?: string;
	[x: string]: any;
}
const Input = ({ label, className, inputClass, name, ...rest }: IInput) => {
	return (
		<label htmlFor={name} className={`Input`}>
			<input id={name} name={name} className={inputClass} {...rest} />
			<span>{label}</span>
		</label>
	);
};

export default Input;

import { DialogHTMLAttributes, useRef, ReactNode, MouseEvent } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { useOutsideAlerter } from "../../utils/callbacks";
import Button from "../Button";
import { IButton } from "../Button/Button";
import "./Modal.scss";

export interface IModal extends DialogHTMLAttributes<HTMLDialogElement> {
	children?: ReactNode;
	className?: string;
	buttonLabel?: string;
	buttonVariant?: IButton["variant"];
}

const Modal = ({
	children,
	className,
	buttonVariant,
	buttonLabel,
	...rest
}: IModal) => {
	const modalRef = useRef<HTMLDialogElement>(null);
	const showModal = () => {
		modalRef.current?.showModal();
	};
	const closeModal = (e: MouseEvent) => {
		var rect = modalRef.current?.getBoundingClientRect();
		var isInDialog =
			rect &&
			rect.top <= e?.clientY &&
			e?.clientY <= rect.top + rect.height &&
			rect.left <= e?.clientX &&
			e?.clientX <= rect.left + rect.width;
		if (!isInDialog) {
			modalRef.current?.close();
		}
	};
	return (
		<>
			<Button onClick={() => showModal()} variant={buttonVariant}>
				{buttonLabel}
			</Button>
			<dialog
				onClick={(e) => closeModal(e)}
				id="modal-dialog"
				ref={modalRef}
				className={`Modal ${className}`}
				{...rest}
			>
				<div className="Modal__container">
					<form method="dialog">
						<button
							className="Modal__close"
							onClick={(e) => closeModal(e)}
						>
							<FaRegWindowClose size={32} />
						</button>
					</form>
					{children}
				</div>
			</dialog>
		</>
	);
};

export default Modal;

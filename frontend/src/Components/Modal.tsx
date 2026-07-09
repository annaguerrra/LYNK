import "./Styles/modal.css"
import { Button } from "./Button"
import { useModal } from "../Providers/modalContext";
import { ButtonClose } from "./ButtonClose";


interface Input {
   name: string;
}

interface ModalProps {
    Title: string;
    Inputs: Input[];
}


export function Modal({ Title, Inputs }: ModalProps) {
    const { closeModal } = useModal();
    return (
        <>
            <div className="modalOverlay">
                <div className="modalBackdrop" onClick={closeModal}>
                </div>
                    <div className="modalContainer">
                        <div className="titleContainer">
                            <h1>{Title}</h1>
                            <ButtonClose size={40}></ButtonClose>
                        </div>
                        {Inputs.map((input) => <input placeholder={input.name}></input>)}

                        <Button ButtonTitle={"Enviar"} onClose={closeModal}></Button>
                    </div>
            </div>
        </>
    )
}
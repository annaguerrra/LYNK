import "./Styles/modal.css"
import { Button } from "./Button"
import { useModal } from "../Providers/modalContext";


export function Modal({ Title }) {
    const { closeModal } = useModal();
    return (
        <>
            <div className="modalOverlay">
                <div className="modalBackdrop">
                </div>
                    <div className="modalContainer">
                        <div className="titleContainer">
                            <h1>{Title}</h1>
                            <h1>X</h1>
                        </div>
                        <input type="text" name="" id="" className="modalInput"/>
                        <input type="text" name="" id="" className="modalInput"/>
                        <Button ButtonTitle={"Enviar"} path={""} onClose={closeModal}></Button>
                    </div>
            </div>
        </>
    )
}
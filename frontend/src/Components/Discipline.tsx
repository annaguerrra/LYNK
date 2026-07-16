import "./Styles/discipline.css";
import "../Pages/Styles/Modals.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MoreOpt } from "./MoreOpt";
import { Button } from "./Button";
import { ButtonClose } from "./ButtonClose";
import { ButtonExclude } from "./ButtonExclude";
import { ButtonCancel } from "./ButtonCancel";

export function DisciplineComp({Discipline, Area}) {
    const navigate = useNavigate();
    const [editModal, setEditModal] = useState(false);
    const [excludeModal, setExcludeModal] = useState(false);

    const options = [
        {
            name: "Editar disciplina",
            onClick: () => setEditModal(true)
        },
        {
            name: "Excluir disciplina",
            onClick: () => setExcludeModal(true)
        },
    ];


    return (
        <> 
        <div className="disciplineBox">
            <div className="boxColor" onClick={() => navigate('/Content')}></div>
            <div className="whiteBox">
                <div onClick={() => navigate('/Content')}>
                    <h1>{Discipline}</h1>
                    <h2>{Area}</h2>
                </div>
                <MoreOpt data={options}></MoreOpt>
            </div>
        </div>
        {editModal && (
             <div className="modalOverlay" onClick={() => setEditModal(false)}>
                <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                    <div className="titleContainer">
                        <h1>Editar disciplina</h1>
                        <ButtonClose size={40} onClose={() => setEditModal(false)}></ButtonClose>
                    </div>
                    <div className="textBox">
                        <h2>Nome da disciplina</h2>
                        <input type="text" />
                    </div>
                    <div className="textBox">
                        <h2>Selecione a área de conhecimento</h2>
                        <select name="" id="">
                            <option value="Tecnologia" selected></option>
                        </select>
                    </div>

                    <Button ButtonTitle={"Enviar"} onClose={() => setEditModal(false)}></Button>
                </div>
            </div>
        )}

        {excludeModal && (
             <div className="modalExcludeOverlay" onClick={() => setExcludeModal(false)}>
                <div className="modalExcludeContainer" onClick={(e) => e.stopPropagation()} >
                <div className="redString"></div>
                    <p>Deseja excluir a disciplina {Discipline}?</p>

                    <div className="buttonsBox">
                        <ButtonExclude ButtonTitle={"Excluir"} onClose={() => setExcludeModal(false)}></ButtonExclude>
                        <br />
                        <ButtonCancel ButtonTitle={"Cancelar"} onClose={() => setExcludeModal(false)}></ButtonCancel>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}
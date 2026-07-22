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
    //Variables to open the modals
    const [editModal, setEditModal] = useState(false);
    const [excludeModal, setExcludeModal] = useState(false);

    //Options for the options buttons to open the right modal
    const options = [
        {
            name: "Editar disciplina",
            onClick: () => setEditModal(true)
        },
        {
            name: "Excluir disciplina",
            onClick: () => setExcludeModal(true),
            color: "red"
        },
    ];


    return (
        <> 
        {/* Main box for the hole discipline to render with the right options */}
        <div className="disciplineBox">
            <div className="boxColor" onClick={() => navigate('/Content')}></div>
            <div className="whiteBox">
                <div onClick={() => navigate('/Content')} style={{height: '100%'}}>
                    <h1>{Discipline}</h1>
                    <h2>{Area}</h2>
                </div>
                <MoreOpt data={options} size={30}></MoreOpt>
            </div>
        </div>

        {/* Modal to edit the discipline */}
        {editModal && (
             <div className="modalOverlay" onClick={() => setEditModal(false)}>
                <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                    {/* Title and close button box */}
                    <div className="titleContainer">
                        <h1>Editar disciplina</h1>
                        <ButtonClose size={40} onClose={() => setEditModal(false)}></ButtonClose>
                    </div>
                    {/* Input for the discipline name */}
                    <div className="textBox">
                        <h2>Nome da disciplina</h2>
                        <input type="text" />
                    </div>
                    {/* Select for the area */}
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

        {/* Modal to exclude the discipline */}
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
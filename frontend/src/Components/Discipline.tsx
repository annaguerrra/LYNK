import { MoreOpt } from "./MoreOpt";
import "./Styles/discipline.css";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "./Button";
import { ButtonClose } from "./ButtonClose";
import { ButtonCancel } from "./ButtonCancel";

export function DisciplineComp({Discipline, Area}) {
    const navigate = useNavigate();
    const [editModal, setEditModal] = useState(false);
    const [excludeModal, setExcludeModal] = useState(false);

    const options = [
        {
            id: 1,
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
            <div className="boxColor" onClick={() => navigate("/Class")}></div> 
            <div> 
                <h1>{Discipline}</h1> 
                <h2>{Area}</h2> 
            </div> 
            <MoreOpt data={options}></MoreOpt> 
        </div>
        {editModal && (
             <div className="modalOverlay">
                <div className="modalContainer">
                    <div className="titleContainer">
                        <h1>Editar disciplina</h1>
                        <ButtonClose size={40} onClose={() => setEditModal(false)}></ButtonClose>
                    </div>
                    <div className="textBox">
                        <h2>Nome da disciplina</h2>
                        <input type="text" placeholder="Digite o nome da disciplina"/>
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
             <div className="modalOverlay">
                <div className="modalContainer">
                    <div className="titleContainer">
                        <h1>Excluir disciplina</h1>
                        <ButtonClose size={40} onClose={() => setExcludeModal(false)}></ButtonClose>
                    </div>
                    <p>Deseja excluir a disciplina {Discipline}?</p>

                    <div>
                        <ButtonCancel ButtonTitle={"Excluir"} onClose={() => setExcludeModal(false)}></ButtonCancel>
                        <br />
                        <Button ButtonTitle={"Cancelar"} onClose={() => setExcludeModal(false)}></Button>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}
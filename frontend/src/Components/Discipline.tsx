import { useState } from "react";
import { MoreOpt } from "./MoreOpt";
import "./Styles/discipline.css";
import { Modal } from "./Modal";
import { useNavigate } from "react-router-dom";

export function DisciplineComp() {
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);

    const options = [
        {
            name: "Editar disciplina",
            onClick: () => setModal(true),
        },
        {
            name: "Excluir disciplina",
            onClick: () => setModal(true),
        },
    ];

    return (
        <> 
        <div className="disciplineBox"> 
            <div className="boxColor" onClick={() => navigate("/Class")}></div> 
            <div> 
                <h1>Discipline</h1> 
                <h2>Knowledge area</h2> 
            </div> 
            <MoreOpt data={options}></MoreOpt> 
        </div>
        {modal && (
            <Modal onClose={modal}></Modal>
        )}
        </>
    );
}
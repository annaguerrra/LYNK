import { useState } from "react";
import { MoreOpt } from "./MoreOpt";
import "./Styles/discipline.css";
import { Modal } from "./Modal";

export function DisciplineComp() {
    const [modal, setModal] = useState<React.ReactNode>(null);

    const options = [
        {
            name: "Editar disciplina",
            onClick: () => setModal(Modal),
        },
        {
            name: "Excluir disciplina",
            onClick: () => setModal(Modal),
        },
    ];

    return (
        <> 
        <div className="disciplineBox"> 
            <div className="boxColor"></div> 
            <div> 
                <h1>Discipline</h1> 
                <h2>Knowledge area</h2> 
            </div> 
            <MoreOpt data={options}></MoreOpt> 
        </div>
        </>
    );
    {modal}
}
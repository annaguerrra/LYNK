import { MoreOpt } from "./MoreOpt";
import "./Styles/discipline.css";
import { Modal } from "./Modal";
import { useNavigate } from "react-router-dom";
import { useModal } from "../Providers/modalContext";

export function DisciplineComp({Discipline, Area}) {
    const navigate = useNavigate();
     const { modal, openModal } = useModal();

    const options = [
        {
            name: "Editar disciplina",
            onClick: openModal
        },
        {
            name: "Excluir disciplina",
            onClick: openModal
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
        {modal && (
            <Modal Title={"Editar disciplina"}></Modal>
        )}
        </>
    );
}
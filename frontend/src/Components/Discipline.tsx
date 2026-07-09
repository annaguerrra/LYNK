import { MoreOpt } from "./MoreOpt";
import "./Styles/discipline.css";
import { Modal } from "./Modal";
import { useNavigate } from "react-router-dom";
import { useModal } from "../Providers/modalContext";
import { useState } from "react";

export function DisciplineComp({Discipline, Area}) {
    const navigate = useNavigate();
    const { modal, openModal } = useModal();
    const [texto, setTexto] = useState("")

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

    const inputs = [
        {
            name: "Editar"
        },
        {
            name: "Excluir"
        },
         {
            name: "Consultar"
        }
    ]

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
            <Modal Title={"Editar disciplina"} Inputs={inputs}>
            </Modal>
        )}
        </>
    );
}
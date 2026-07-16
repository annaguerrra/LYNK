import "./Styles/Discipline.css";
import "./Styles/Modals.css";
import { Header } from "../Components/Header";
import { DisciplineComp } from "../Components/Discipline";
import { MoreOpt } from "../Components/MoreOpt";
import { Button } from "../Components/Button";
import { ButtonClose } from "../Components/ButtonClose";
import { ButtonExclude } from "../Components/ButtonExclude";
import { ButtonCancel } from "../Components/ButtonCancel";
import { useState } from "react";
import { RowItem } from "../Components/RowItem";

export function Discipline () {
    const [newModal, setNewModal] = useState(false);
    const [usersModal, setUsersModal] = useState(false);
    const [areasModal, setAreasModal] = useState(false);
    const [newUserModal, setNewUserModal] = useState(false);
    const [editUserModal, setEditUserModal] = useState(false);
    const [excludeUserModal, setExcludeUserModal] = useState(false);


    const options = [
        {
            name: "Nova disciplina",
            onClick: () => setNewModal(true)
        },
        {
            name: "Novo usuário",
            onClick: () => setNewModal(true)
        },
        {
            name: "Gerenciar usuários",
            onClick: () => setNewUserModal(true)
        },
        {
            name: "Gerenciar áreas",
            onClick: () => setAreasModal(true)
        },
    ];

    const userOpt = [
        {
            name: "Editar usuário",
            onClick: () => setEditUserModal(true)
        },
        {
            name: "Excluir usuário",
            onClick: () => setExcludeUserModal(true)
        },
    ];

    return (
        <>  
            <Header></Header>
            <div className="page">
                <div className="filtersContainer">
                    <h1 className="titlePage">Bem vindo(a)</h1>
                    <div className="filters">
                        <form>
                            <select id="" name="" className="selectFilter">
                                <option value="TI">TI</option>
                                <option value="Mecânica" selected>Mecânica</option>
                                <option value="Eletrônica">Eletrônica</option>
                                <option value="Administração" selected>Administração</option>
                            </select>
                        </form>
                        <form>
                            <select id="" name="" className="selectFilter">
                                <option value="Inglês">Inglês</option>
                                <option value="Comunicação" selected>Comunicação</option>
                                <option value="Slides">Slides</option>
                                <option value="Organização">Organização</option>
                            </select>
                        </form>
                        <MoreOpt data={options}></MoreOpt>
                    </div>
                </div>
                <div className="disciplinesContainer">
                    <DisciplineComp Discipline={"Inglês"} Area={"Administração"}></DisciplineComp>
                    <DisciplineComp Discipline={"Comunicação"} Area={"Administração"}></DisciplineComp>
                    <DisciplineComp Discipline={"Slides"} Area={"Administração"}></DisciplineComp>
                    <DisciplineComp Discipline={"Organização"} Area={"Administração"}></DisciplineComp>
                </div>
            </div>

            {newModal && (
                <div className="modalOverlay" onClick={() => setNewModal(false)}>
                <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                    <div className="titleContainer">
                        <h1>Registrar disciplina</h1>
                        <ButtonClose size={40} onClose={() => setNewModal(false)}></ButtonClose>
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

                    <Button ButtonTitle={"Enviar"} onClose={() => setNewModal(false)}></Button>
                </div>
            </div>
        )}

        {newUserModal && (
                <div className="modalOverlay" onClick={() => setNewUserModal(false)}>
                <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                    <div className="titleContainer">
                        <h1>Registrar usuário</h1>
                        <ButtonClose size={40} onClose={() => setNewUserModal(false)}></ButtonClose>
                    </div>
                    <div className="textBox">
                        <h2>Nome da disciplina</h2>
                        <input type="text" placeholder="Digite o nome da disciplina"/>
                    </div>
                    <div className="textBox">
                        <h2>Selecione o tipo de usuário</h2>
                        <select name="" id="">
                            <option value="Administrador" selected></option>
                            <option value="Instrutor"></option>
                            <option value="Aluno" ></option>
                        </select>
                    </div>

                    <Button ButtonTitle={"Enviar"} onClose={() => setNewUserModal(false)}></Button>
                </div>
            </div>
        )}

        {usersModal && (
                <div className="modalOverlay" onClick={() => setUsersModal(false)}>
                <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                    <div className="titleContainer">
                        <h1>Gerenciar usuários</h1>
                        <ButtonClose size={40} onClose={() => setUsersModal(false)}></ButtonClose>
                    </div>
                    <RowItem color='var(--green)'>
                        <div className="itemText">
                            <p >Manufatura_20252</p>
                        </div>
                        <MoreOpt data={userOpt}></MoreOpt>
                    </RowItem>

                </div>
            </div>
        )}

        {areasModal && (
                <div className="modalOverlay" onClick={() => setAreasModal(false)}>
                <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                    <div className="titleContainer">
                        <h1>Excluir disciplina</h1>
                        <ButtonClose size={40} onClose={() => setAreasModal(false)}></ButtonClose>
                    </div>
                    <p></p>

                    <div>
                        <ButtonCancel ButtonTitle={"Excluir"} onClose={() => setAreasModal(false)}></ButtonCancel>
                        <br />
                        <Button ButtonTitle={"Cancelar"} onClose={() => setAreasModal(false)}></Button>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}
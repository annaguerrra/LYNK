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
    const cores = {
        Roxo: "var(--purple)",
        Verde: "var(--green)",
        "Verde-água": "var(--acqua)",
    };
    
    const [cor, setCor] = useState("Roxo");
    
    const [newDisciplineModal, setNewDisciplineModal] = useState(false);
    const [usersModal, setUsersModal] = useState(false);
    const [newAreaModal, setNewAreaModal] = useState(false);
    const [areasModal, setAreasModal] = useState(false);
    const [newUserModal, setNewUserModal] = useState(false);
    const [editStudentModal, setEditStudentModal] = useState(false);
    const [excludeUserModal, setExcludeUserModal] = useState(false);
    const [editAreaModal, setEditAreaModal] = useState(false);
    const [excludeAreaModal, setExcludeAreaModal] = useState(false);
    const [resetPasswordModal, setResetPasswordModal] = useState(false);


    const options = [
        {
            name: "Nova disciplina",
            onClick: () => setNewDisciplineModal(true)
        },
        {
            name: "Novo usuário",
            onClick: () => setNewUserModal(true)
        },
        {
            name: "Nova área",
            onClick: () => setNewAreaModal(true)
        },
        {
            name: "Gerenciar usuários",
            onClick: () => setUsersModal(true)
        },
        {
            name: "Gerenciar áreas",
            onClick: () => setAreasModal(true)
        },
    ];

    const userOpt = [
        {
            name: "Editar usuário",
            onClick: () => { setEditStudentModal(true), setUsersModal(false) }
        },
        {
            name: "Excluir usuário",
            onClick: () => { setExcludeUserModal(true), setUsersModal(false) }
        },
        {
            name: "Resetar senha",
            onClick: () => { setResetPasswordModal(true), setUsersModal(false) }
        },
    ];

    const areasOpt = [
        {
            name: "Editar área",
            onClick: () => { setEditAreaModal(true), setAreasModal(false) }
        },
        {
            name: "Excluir área",
            onClick: () => { setExcludeAreaModal(true), setAreasModal(false) }
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
                        <MoreOpt data={options} size={40}></MoreOpt>
                    </div>
                </div>
                <div className="disciplinesContainer">
                    <DisciplineComp Discipline={"Inglês"} Area={"Administração"}></DisciplineComp>
                    <DisciplineComp Discipline={"Comunicação"} Area={"Administração"}></DisciplineComp>
                    <DisciplineComp Discipline={"Slides"} Area={"Administração"}></DisciplineComp>
                    <DisciplineComp Discipline={"Organização"} Area={"Administração"}></DisciplineComp>
                </div>
            </div>

        {newDisciplineModal && (
            <div className="modalOverlay" onClick={() => setNewDisciplineModal(false)}>
                <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                    <div className="titleContainer">
                        <h1>Registrar disciplina</h1>
                        <ButtonClose size={40} onClose={() => setNewDisciplineModal(false)}></ButtonClose>
                    </div>
                    <div className="textBox">
                        <h2>Nome da disciplina</h2>
                        <input type="text" placeholder="Digite o nome da disciplina"/>
                    </div>
                    <div className="textBox">
                        <h2>Selecione a área de conhecimento</h2>
                        <select name="" id="">
                            <option value="Tecnologia" selected>Tecnologia</option>
                        </select>
                    </div>

                    <Button ButtonTitle={"Enviar"} onClose={() => setNewDisciplineModal(false)}></Button>
                </div>
            </div>
        )}
{/* -------------------------------------------------------- USERS MODALS -------------------------------------------------------- */}

        {newUserModal && (
                <div className="modalOverlay" onClick={() => setNewUserModal(false)}>
                <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                    <div className="titleContainer">
                        <h1>Registrar usuário</h1>
                        <ButtonClose size={40} onClose={() => setNewUserModal(false)}></ButtonClose>
                    </div>
                    <div className="textBox">
                        <h2>Selecione o tipo de usuário</h2>
                        <select name="" id="" className="selectFilter">
                            <option value="Administrador" selected>Administrador</option>
                            <option value="Instrutor">Instrutor</option>
                            <option value="Aluno" >Aluno</option>
                        </select>
                    </div>
                    <div className="textBox">
                        <h2>Nome do usuário</h2>
                        <input type="text"/>
                    </div>
                    <div className="textBox">
                        <h2>Senha do usuário</h2>
                        <input type="password"/>
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
                            <p>Manufatura_20252</p>
                        </div>
                        <MoreOpt data={userOpt}></MoreOpt>
                    </RowItem>
                    <div></div>
                </div>
            </div>
        )}

        {resetPasswordModal && (
                <div className="modalExcludeOverlay" onClick={() => setResetPasswordModal(false)}>
                <div className="modalExcludeContainer" onClick={(e) => e.stopPropagation()} >
                <div className="redString"></div>
                    <p>Deseja resetar a senha o usuário?</p>

                    <div className="buttonsBox">
                        <ButtonExclude ButtonTitle={"Resetar"} onClose={() => setResetPasswordModal(false)}></ButtonExclude>
                        <br />
                        <ButtonCancel ButtonTitle={"Cancelar"} onClose={() => setResetPasswordModal(false)}></ButtonCancel>
                    </div>
                </div>
            </div>
        )}

        {editStudentModal && (
                <div className="modalOverlay" onClick={() => setEditStudentModal(false)}>
                <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                    <div className="titleContainer">
                        <h1>Editar usuário</h1>
                        <ButtonClose size={40} onClose={() => setEditStudentModal(false)}></ButtonClose>
                    </div>
                    <div className="textBox">
                        <h2>Selecione o tipo de usuário</h2>
                        <select name="" id="" className="selectFilter">
                            <option value="Administrador" selected>Administrador</option>
                            <option value="Instrutor">Instrutor</option>
                            <option value="Aluno">Aluno</option>
                        </select>
                    </div>
                    <div className="textBox">
                        <h2>Nome do usuário</h2>
                        <input type="text"/>
                    </div>
                    <div className="textBox">
                        <h2>Senha do usuário</h2>
                        <input type="password"/>
                    </div>

                    <Button ButtonTitle={"Enviar"} onClose={() => setEditStudentModal(false)}></Button>
                </div>
            </div>
        )}

        {excludeUserModal && (
             <div className="modalExcludeOverlay" onClick={() => setExcludeUserModal(false)}>
                <div className="modalExcludeContainer" onClick={(e) => e.stopPropagation()} >
                <div className="redString"></div>
                    <p>Deseja excluir o usuário?</p>

                    <div className="buttonsBox">
                        <ButtonExclude ButtonTitle={"Excluir"} onClose={() => setExcludeUserModal(false)}></ButtonExclude>
                        <br />
                        <ButtonCancel ButtonTitle={"Cancelar"} onClose={() => setExcludeUserModal(false)}></ButtonCancel>
                    </div>
                </div>
            </div>
        )}

{/* -------------------------------------------------------- AREAS MODALS -------------------------------------------------------- */}
        {newAreaModal && (
                <div className="modalOverlay" onClick={() => setNewAreaModal(false)}>
                <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                    <div className="titleContainer">
                        <h1>Registrar área</h1>
                        <ButtonClose size={40} onClose={() => setNewAreaModal(false)}></ButtonClose>
                    </div>
                    <div className="textBox">
                        <h2>Nome da área</h2>
                        <input type="text"/>
                    </div>
                    <div className="textBox">
                        <h2>Selecione a cor da área</h2>
                        <select name="" id="" className="selectFilter" value={cor}
                        onChange={(e) => setCor(e.target.value)}
                        style={{ color: cores[cor] }}>
                            <option value="Roxo" style={{ color: "var(--purple)" }} selected>Roxo</option>
                            <option value="Verde" style={{ color: "var(--green)" }}>Verde</option>
                            <option value="Verde-água" style={{ color: "var(--acqua)"}}>Verde-água</option>
                        </select>
                    </div>

                    <Button ButtonTitle={"Enviar"} onClose={() => setNewAreaModal(false)}></Button>
                </div>
            </div>
        )}

        {areasModal && (
                <div className="modalOverlay" onClick={() => setAreasModal(false)}>
                <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                    <div className="titleContainer">
                        <h1>Gerenciar áreas</h1>
                        <ButtonClose size={40} onClose={() => setAreasModal(false)}></ButtonClose>
                    </div>
                    <RowItem color='var(--green)'>
                        <div className="itemText">
                            <p>Administração</p>
                        </div>
                        <MoreOpt data={areasOpt}></MoreOpt>
                    </RowItem>
                    <div></div>
                </div>
            </div>
        )}

        {editAreaModal && (
                <div className="modalOverlay" onClick={() => setEditAreaModal(false)}>
                <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                    <div className="titleContainer">
                        <h1>Editar  área</h1>
                        <ButtonClose size={40} onClose={() => setEditAreaModal(false)}></ButtonClose>
                    </div>
                    <div className="textBox">
                        <h2>Nome da área</h2>
                        <input type="text"/>
                    </div>
                    <div className="textBox">
                        <h2>Selecione a cor da área</h2>
                        <select name="" id="" className="selectFilter" value={cor}
                        onChange={(e) => setCor(e.target.value)}
                        style={{ color: cores[cor] }}>
                            <option value="Roxo" style={{ color: "var(--purple)" }} selected>Roxo</option>
                            <option value="Verde" style={{ color: "var(--green)" }}>Verde</option>
                            <option value="Verde-água" style={{ color: "var(--acqua)"}}>Verde-água</option>
                        </select>
                    </div>

                    <Button ButtonTitle={"Enviar"} onClose={() => setEditAreaModal(false)}></Button>
                </div>
            </div>
        )}

        {excludeAreaModal && (
                <div className="modalExcludeOverlay" onClick={() => setExcludeAreaModal(false)}>
                <div className="modalExcludeContainer" onClick={(e) => e.stopPropagation()} >
                <div className="redString"></div>
                    <p>Deseja excluir a área?</p>
        
                    <div className="buttonsBox">
                        <ButtonExclude ButtonTitle={"Excluir"} onClose={() => setExcludeAreaModal(false)}></ButtonExclude>
                        <br />
                        <ButtonCancel ButtonTitle={"Cancelar"} onClose={() => setExcludeAreaModal(false)}></ButtonCancel>
                    </div>
                </div>
            </div>
        )}


        </>
    )
}
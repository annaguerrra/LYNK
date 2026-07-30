import "./Styles/Discipline.css";
import "./Styles/Modals.css";
import { Header } from "../Components/Header";
import { DisciplineComp } from "../Components/Discipline";
import { MoreOpt } from "../Components/MoreOpt";
import { Button } from "../Components/Button";
import { ButtonClose } from "../Components/ButtonClose";
import { ButtonExclude } from "../Components/ButtonExclude";
import { ButtonCancel } from "../Components/ButtonCancel";
import { useEffect, useState } from "react";
import { RowItem } from "../Components/RowItem";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { createDisciplineService, getDisciplines, duplicateDiscipline } from "../Services/disciplinesService";

import type { DisciplinesDTO, createDiscipline } from "../Types/disciplineDTOS";
import type { AreaDTO, registerAreaDTO, updateAreaDTO } from "../Types/area";
import { createArea, deleteArea, getAreas, updateArea } from "../Services/areasService";
import type { registerUserDTO } from "../Types/user";
import { createUser } from "../Services/userService";


export function Discipline() {
    //Variables to navigate and open modals
    const navigate = useNavigate();
    const cores = {
        Roxo: "var(--purple)",
        Verde: "var(--green)",
        VerdeAgua: "var(--acqua)",
    };

    const [disciplines, setDisciplines] = useState<DisciplinesDTO[]>([])


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


    //Variables to control the users and its interactions
    const { user } = useAuth();
    const isAdmin = user?.role === "ADMIN";
    const isInstructor = user?.role === "INSTRUCTOR";
    const [username, setUsername] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userType, setUserType] = useState("STUDENT");


    //Options for the option buttons
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
        {
            name: "Histórico de Ações",
            onClick: () => navigate("/History")
        },
    ];

    const userOpt = [
        {
            name: "Editar usuário",
            onClick: () => { setEditStudentModal(true), setUsersModal(false) }
        },
        {
            name: "Excluir usuário",
            onClick: () => { setExcludeUserModal(true), setUsersModal(false) },
            color: "red"
        },
        {
            name: "Resetar senha",
            onClick: () => { setResetPasswordModal(true), setUsersModal(false) },
            color: "red"
        },
    ];

    const areasOpt = [
        {
            name: "Editar área",
            onClick: () => { setEditAreaModal(true), setAreasModal(false) }
        },
        {
            name: "Excluir área",
            onClick: () => { setExcludeAreaModal(true), setAreasModal(false) },
            color: "red",
        },
    ];

    //---------------------- From Area Services ---------------------------------------------------------------- 
    //Inputs to create and edit a area
    const [areaName, setAreaName] = useState("")
    const [areaColor, setAreaCor] = useState("Roxo");
    const [selectedAreaId, setSelectedAreaId] = useState<number | null>(null);

    async function loadAreas() {
        try {
            const response = await getAreas();
            setAreas(response);
        } catch (error) {
            console.error(error);
        }
    }

    async function createNewArea(data: registerAreaDTO) {
        try {
            await createArea(data);
            await loadAreas();

            setNewAreaModal(false);
            setAreaName("")
        } catch (error) {
            console.error(error);
        }
    }

    async function editArea(id: number, data: updateAreaDTO) {
        try {
            await updateArea(id, data);
            await loadAreas();

            setEditAreaModal(false);
            setAreaName("")
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteAreas(id: number) {
        try {
            await deleteArea(id);
            await loadAreas();

            setExcludeAreaModal(false);
        } catch (error) {
            console.error(error);
        }
    }


    //---------------------- From Disciplines Services ----------------------------------------------------------------
    //Inputs to create and edit a discipline
    const [disciplineName, setDisciplineName] = useState("")
    const [areas, setAreas] = useState<AreaDTO[]>([]);
    const [areaId, setAreaId] = useState<number>(0);


    async function loadDisciplines() {
        try {
            const response = await getDisciplines();
            setDisciplines(response);
        } catch (error) {
            console.error(error);
        }
    }

    async function createDisc(data: createDiscipline) {
        try {
            const response = await createDisciplineService(data);
            console.log(response);

            await loadDisciplines();
            setNewDisciplineModal(false);
            setDisciplineName("")
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadAreas();
        loadDisciplines();
    }, []);

    async function duplicate(id: number) {
        try {
            const response = await duplicateDiscipline(id);
            console.log(response);

            await loadDisciplines();
        } catch (error) {
            console.log(error);
        }
    }

    //---------------------- From User Services ---------------------------------------------------------------- 

    async function createUserf(data: registerUserDTO) {
        try {
            const response = await createUser(data);

            setNewUserModal(false);
            setUsername("");
            setNewPassword("");
            setUserPassword("");
            setConfirmPassword("");
            setUserType("STUDENT");
            console.log(response);
            setNewDisciplineModal(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Header />

            {/* Whole page */}
            <div className="page">

                {/* Title and filters for area and discplines */}
                <div className="filtersContainer">
                    <h1 className="titlePage">Bem vindo(a)</h1>
                    <div className="filters">
                        {/* Filter for areas */}
                        <form>
                            <select name="" id="" className="selectFilter" defaultValue="Mecânica">
                                <option value="TI">TI</option>
                                <option value="Mecânica">Mecânica</option>
                                <option value="Eletrônica">Eletrônica</option>
                                <option value="Administração">Administração</option>
                            </select>
                        </form>
                        {/* Filter for disciplines */}
                        <form>
                            <select id="" name="" className="selectFilter" defaultValue="Inglês">
                                <option value="Inglês">Inglês</option>
                                <option value="Comunicação">Comunicação</option>
                                <option value="Slides">Slides</option>
                                <option value="Organização">Organização</option>
                            </select>
                        </form>
                        {(isAdmin || isInstructor) &&
                            <MoreOpt data={options} size={40}></MoreOpt>
                        }
                    </div>
                </div>
                {/* Box for all the disciplines display */}
                <div className="disciplinesContainer">
                    {disciplines.map((discipline) => (
                        <DisciplineComp Discipline={discipline}></DisciplineComp>
                    ))}
                </div>
            </div>

            {/* -------------------------------------------------------- DISCIPLINES MODALS -------------------------------------------------------- */}

            {/* Modal to create a new discipline */}
            {newDisciplineModal && (
                <div className="modalOverlay" onClick={() => setNewDisciplineModal(false)}>
                    <div className="modalContainer" onClick={(e) => e.stopPropagation()}>

                        {/* Title and close button box */}
                        <div className="titleContainer">
                            <h1>Registrar disciplina</h1>
                            <ButtonClose size={40} onClose={() => setNewDisciplineModal(false)}></ButtonClose>
                        </div>
                        {/* Input for discipline name */}
                        <div className="textBox">
                            <h2>Nome da disciplina</h2>
                            <input type="text" value={disciplineName} onChange={(e) => setDisciplineName(e.target.value)} />
                        </div>
                        {/* Select for the area */}
                        <div className="textBox">
                            <h2>Selecione a área de conhecimento</h2>
                            <select
                                value={areaId}
                                onChange={(e) => setAreaId(Number(e.target.value))}
                            >
                                {areas.map((area) => (
                                    <option key={area.id} value={area.id}>
                                        {area.id}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Button ButtonTitle={"Enviar"} onClose={() => createDisc({
                            name: disciplineName, areaID: areaId, userID: user!.userId
                        })}></Button>
                    </div>
                </div>
            )}
            {/* -------------------------------------------------------- USERS MODALS -------------------------------------------------------- */}

            {/* Modal to create a user */}
            {(newUserModal && isAdmin) && (
                <div className="modalOverlay" onClick={() => setNewUserModal(false)}>
                    <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                        {/* Title and close button box */}
                        <div className="titleContainer">
                            <h1>Registrar usuário</h1>
                            <ButtonClose size={40} onClose={() => setNewUserModal(false)}></ButtonClose>
                        </div>
                        {/* Select for user type */}
                        <div className="textBox">
                            <h2>Selecione o tipo de usuário</h2>
                            <select name="" id=""
                                className="selectFilter"
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                            >
                                <option value="ADMIN">Administrador</option>
                                <option value="INSTRUCTOR">Instrutor</option>
                                <option value="STUDENT" selected>Aluno</option>
                            </select>
                        </div>
                        {/* Input for username */}
                        <div className="textBox">
                            <h2>Nome do usuário</h2>
                            <input type="text" onChange={(e) => setUserPassword(e.target.value)} />
                        </div>
                        {/* Input for user password */}
                        <div className="textBox">
                            <h2>Senha do usuário</h2>
                            <input type="password" onChange={(e) => setUserPassword(e.target.value)} />
                        </div>
                        {/* Input for user password confirmation */}
                        <div className="textBox">
                            <h2>Confirmar senha do usuário</h2>
                            <input type="password" onChange={(e) => setUserPassword(e.target.value)} />
                        </div>

                        <Button ButtonTitle={"Enviar"} onClose={() => createUserf}></Button>
                    </div>
                </div>
            )}

            {/* Modal to manage users */}
            {(usersModal && isAdmin) && (
                <div className="modalOverlay" onClick={() => setUsersModal(false)}>
                    <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                        {/* Title and close button box */}
                        <div className="titleContainer">
                            <h1>Gerenciar usuários</h1>
                            <ButtonClose size={40} onClose={() => setUsersModal(false)}></ButtonClose>
                        </div>
                        {/* Users display */}
                        <div className="itemsBox">
                            <RowItem color='var(--green)'>
                                <div className="itemText">
                                    <p>Manufatura_20252</p>
                                </div>
                                <MoreOpt data={userOpt} size={25}></MoreOpt>
                            </RowItem>
                            <RowItem color='var(--green)'>
                                <div className="itemText">
                                    <p>Manufatura_20252</p>
                                </div>
                                <MoreOpt data={userOpt} size={25}></MoreOpt>
                            </RowItem>
                        </div>
                        <div></div>
                    </div>
                </div>
            )}

            {/* Modal to edit a user */}
            {(editStudentModal && isAdmin) && (
                <div className="modalOverlay" onClick={() => setEditStudentModal(false)}>
                    <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                        {/* Title and close button box */}
                        <div className="titleContainer">
                            <h1>Editar usuário</h1>
                            <ButtonClose size={40} onClose={() => setEditStudentModal(false)}></ButtonClose>
                        </div>
                        {/* Select the user type */}
                        <div className="textBox">
                            <h2>Selecione o tipo de usuário</h2>
                            <select name="" id="" className="selectFilter">
                                <option value="Administrador">Administrador</option>
                                <option value="Instrutor">Instrutor</option>
                                <option value="Aluno" selected>Aluno</option>
                            </select>
                        </div>
                        {/* Input for the username */}
                        <div className="textBox">
                            <h2>Nome do usuário</h2>
                            <input type="text" />
                        </div>
                        {/* Input for the user password */}
                        <div className="textBox">
                            <h2>Senha do usuário</h2>
                            <input type="password" />
                        </div>

                        <Button ButtonTitle={"Enviar"} onClose={() => setEditStudentModal(false)}></Button>
                    </div>
                </div>
            )}

            {/* Modal to exclude the user */}
            {(excludeUserModal && isAdmin) && (
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

            {/* Modal to rest a user password */}
            {(resetPasswordModal && isAdmin) && (
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

            {/* -------------------------------------------------------- AREAS MODALS -------------------------------------------------------- */}

            {/* Modal to create a new area */}
            {newAreaModal && (
                <div className="modalOverlay" onClick={() => setNewAreaModal(false)}>
                    <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                        {/* Title and close button box */}
                        <div className="titleContainer">
                            <h1>Registrar área</h1>
                            <ButtonClose size={40} onClose={() => setNewAreaModal(false)}></ButtonClose>
                        </div>
                        {/* Input for the area name */}
                        <div className="textBox">
                            <h2>Nome da área</h2>
                            <input type="text" value={areaName} onChange={(e) => setAreaName(e.target.value)} />
                        </div>
                        {/* Select for the area color */}
                        <div className="textBox">
                            <h2>Selecione a cor da área</h2>
                            <select name="" id="" className="selectFilter" value={areaColor}
                                onChange={(e) => setAreaCor(e.target.value)}
                            // style={{ color: cores[cor] }}
                            >
                                <option value="Roxo" style={{ color: "var(--purple)" }} selected>Roxo</option>
                                <option value="Verde" style={{ color: "var(--green)" }}>Verde</option>
                                <option value="Verde-água" style={{ color: "var(--acqua)" }}>Verde-água</option>
                            </select>
                        </div>

                        <Button ButtonTitle={"Enviar"} onClose={() => createNewArea({
                            name: areaName, color: areaColor
                        })}></Button>
                    </div>
                </div>
            )}

            {/* Modal to manage areas */}
            {areasModal && (
                <div className="modalOverlay" onClick={() => setAreasModal(false)}> 
                    <div className="modalContainer" onClick={(e) => e.stopPropagation()}> 
                    {/* Title and close button box */}
                    <div className="titleContainer"> 
                        <h1>Gerenciar áreas</h1> 
                        <ButtonClose size={40} onClose={() => setAreasModal(false)}></ButtonClose> 
                    </div> 
                    <div className="itemsBox">
                    {areas.map((area) => (
                        <RowItem color={area.color}>
                            <div className="itemText">
                                <p>{area.name}</p>
                            </div>

                            <MoreOpt
                                size={25}
                                data={[
                                    {
                                        name: "Editar",
                                        onClick: () => {
                                            setSelectedAreaId(area.id);
                                            setAreaName(area.name);
                                            setAreaCor(area.color);
                                            setEditAreaModal(true);
                                        },
                                    },
                                    {
                                        name: "Excluir",
                                        onClick: () => {
                                            setSelectedAreaId(area.id);
                                            setExcludeAreaModal(true);
                                        },
                                    },
                                ]}
                            />
                        </RowItem>
                    ))}
                </div>
                    <div></div> 
                    </div> 
                </div>
            )}

            {/* Modal to edit a area */}
            {editAreaModal && (
                <div className="modalOverlay" onClick={() => setEditAreaModal(false)}>
                    <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                        {/* Title and close button box */}
                        <div className="titleContainer">
                            <h1>Editar  área</h1>
                            <ButtonClose size={40} onClose={() => setEditAreaModal(false)}></ButtonClose>
                        </div>
                        {/* Input for the area name */}
                        <div className="textBox">
                            <h2>Nome da área</h2>
                            <input type="text" />
                        </div>
                        {/* Select for the area color */}
                        <div className="textBox">
                            <h2>Selecione a cor da área</h2>
                            <select name="" id="" className="selectFilter" value={areaColor}
                                onChange={(e) => setAreaCor(e.target.value)}
                            // style={{ color: cores[cor] }}
                            >
                                <option value="Roxo" style={{ color: "var(--purple)" }} selected>Roxo</option>
                                <option value="Verde" style={{ color: "var(--green)" }}>Verde</option>
                                <option value="Verde-água" style={{ color: "var(--acqua)" }}>Verde-água</option>
                            </select>
                        </div>

                        <Button ButtonTitle={"Enviar"} onClose={() => setEditAreaModal(false)}></Button>
                    </div>
                </div>
            )}

            {/* Modal to exclude the area */}
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
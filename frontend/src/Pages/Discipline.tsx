import "./Styles/Discipline.css";
import "./Styles/Modals.css";
import { Header } from "../Components/Header";
import { DisciplineComp } from "../Components/Discipline";
import { MoreOpt } from "../Components/MoreOpt";
import { Button } from "../Components/Button";
import { ButtonClose } from "../Components/ButtonClose";
import { ButtonExclude } from "../Components/ButtonExclude";
import { ButtonCancel } from "../Components/ButtonCancel";
import React, { useEffect, useState } from "react";
import { RowItem } from "../Components/RowItem";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { createDisciplineService, getDisciplines, duplicateDiscipline } from "../Services/disciplinesService";
import { toast } from "react-toastify";
import type { createDiscipline, DisciplineDTO } from "../Types/discipline";
import type { AreaDTO, registerAreaDTO, updateAreaDTO } from "../Types/area";
import { createArea, deleteArea, getAreas, updateArea } from "../Services/areasService";
<<<<<<< HEAD
import type { registerUserDTO, showStudentDTO } from "../Types/user";
import { createUser, getAdmins, getInstructors, getStudents, getUsers } from "../Services/userService";
=======
import type { registerUserDTO, UserType } from "../Types/user";
import { createUser } from "../Services/userService";
>>>>>>> d95e615e32f497e55b769fdfc5ded33a28b5cf73


export function Discipline() {
    //Variables to navigate and open modals
    const navigate = useNavigate();
    const [disciplines, setDisciplines] = useState<DisciplineDTO[]>([])
    const [selectedAreaFilter, setSelectedAreaFilter] = useState<number | null>(null)


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
    const [userId, setUserId] = useState()
    const [username, setUsername] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [userType, setUserType] = useState<UserType>("STUDENT");


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
    const [areaColor, setAreaCor] = useState("#9E2896");
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
            toast.success("Área criada com sucesso!");
            await createArea(data);
            await loadAreas();
            
            setNewAreaModal(false);
            setAreaName("")
        } catch (error) {
            toast.error("Não foi possivel criar a área!");
            console.error(error);
        }
    }
    
    async function editArea(id: number, data: updateAreaDTO) {
        try {
            toast.success("Área editada com sucesso!");
            await updateArea(id, data);
            await loadAreas();

            setEditAreaModal(false);
            setAreaName("")
        } catch (error) {
            toast.error("Não foi possivel editar a área!");
            console.log(error.response?.status);
            console.log(error.response?.data);
        }
    }

    async function deleteAreas(id: number) {
        try {
            toast.success("Área deletada com sucesso!");
            await deleteArea(id);
            await loadAreas();

            setExcludeAreaModal(false);
        } catch (error) {
            toast.error("Não foi possivel deletar a área!");
            console.error(error);
        }
    }


    //---------------------- From Disciplines Services ----------------------------------------------------------------
    //Inputs to create and edit a discipline
    const [disciplineName, setDisciplineName] = useState("")
    const [areas, setAreas] = useState<AreaDTO[]>([]);
    const [areaId, setAreaId] = useState(1);


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
            toast.success("Disciplina criada com sucesso!");
            await createDisciplineService(data);

            await loadDisciplines();
            setNewDisciplineModal(false);
            setDisciplineName("")
        } catch (error) {
            toast.error("Não foi possivel criar a disciplina!");
            console.error(error);
        }
    }

    
    async function duplicate(id: number) {
        try {
            toast.success("Disciplina duplicada com sucesso!");
            const response = await duplicateDiscipline(id);
            console.log(response);
            
            await loadDisciplines();
        } catch (error) {
            console.log(error);
        }
    }

    const filteredDisciplines =
        selectedAreaId === null
            ? disciplines
            : disciplines.filter(
                (discipline) => discipline.area.id === selectedAreaId
            );
    
    useEffect(() => {
        loadAreas();
    }, []);
<<<<<<< HEAD

=======
>>>>>>> d95e615e32f497e55b769fdfc5ded33a28b5cf73
    useEffect(() => {
        loadDisciplines();
    }, [areas]);
    //---------------------- From User Services ---------------------------------------------------------------- 
    const [showUsers, setShowUsers] = useState<showStudentDTO[]>([])
    
    async function loadUsers() {
        try {
            const response = await getUsers();

            setShowUsers(response);
        } catch (error) {
            console.error(error);
        }
    }

    async function createUserf() {
        const data: registerUserDTO = {
            username: username,
            password: newPassword,
            repeatPassword: repeatPassword,
            userType: userType
        }
        try {
            const response = await createUser(data);

            setNewUserModal(false);
            setUsername("");
            setNewPassword("");
            setUserPassword("");
            setRepeatPassword("");
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
                            <select
                                className="selectFilter"
                                value={selectedAreaId ?? ""}
                                onChange={(e) =>
                                    setSelectedAreaId(
                                    e.target.value === "" ? null : Number(e.target.value)
                                    )
                                }
                                >
                                <option value="">Selecione uma área</option>

                                {areas.map((area) => (
                                    <option key={area.id} value={area.id}>
                                    {area.name}
                                    </option>
                                ))}
                            </select>
                        </form>
                        
                        {(isAdmin || isInstructor) &&
                            <MoreOpt data={options} size={40}></MoreOpt>
                        }
                    </div>
                </div>
                {/* Box for all the disciplines display */}
                <div className="disciplinesContainer">
                    {filteredDisciplines.map((discipline) => (
                        <DisciplineComp
                        key={discipline.id}
                        Discipline={discipline}
                        />
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
                                        {area.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Button ButtonTitle={"Enviar"} onClose={() => createDisc({
                            name: disciplineName, areaID: areaId
                        })}></Button>
                    </div>
                </div>
            )}
            {/* -------------------------------------------------------- USERS MODALS -------------------------------------------------------- */}

            {/* Modal to create a user */}
            {(newUserModal && isAdmin) && (
                <div className="modalOverlay" onClick={() => setNewUserModal(false)}>
                    <div className="modalContainer" onClick={(e) => e.stopPropagation()}>

                        <div className="titleContainer">
                            <h1>Registrar usuário</h1>
                            <ButtonClose size={40} onClose={() => setNewUserModal(false)} />
                        </div>

                        <div className="textBox">
                            <h2>Selecione o tipo de usuário</h2>
                            <select
                                className="selectFilter"
                                value={userType}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setUserType(e.target.value as UserType)}
                            >
                                <option value="ADMIN">Administrador</option>
                                <option value="INSTRUCTOR">Instrutor</option>
                                <option value="STUDENT">Aluno</option>
                            </select>
                        </div>

                        <div className="textBox">
                            <h2>Nome do usuário</h2>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="textBox">
                            <h2>Senha do usuário</h2>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <div className="textBox">
                            <h2>Confirmar senha do usuário</h2>
                            <input
                                type="password"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                            />
                        </div>

                        <Button
                            ButtonTitle={"Enviar"}
                            onClose={() => createUserf()}
                        />
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
                            {showUsers.map((users) => (
                                <RowItem color={"#000000"}>
                                    <div className="itemText">
                                        <p>{users.username}</p>
                                    </div>

                                    <MoreOpt
                                        size={25}
                                        data={[
                                            {
                                                name: "Editar",
                                                onClick: () => {
                                                    setUserType(users.userType);
                                                    setUsername(users.username);
                                                    setUserId(users.id);
                                                },
                                            },
                                            {
                                                name: "Excluir",
                                                onClick: () => {
                                                    setUserId(users.id);
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
                            <select name="" id="" className="selectFilter" onChange={(e) => setUserType(e.target.value)}>
                                <option value="Administrador">Administrador</option>
                                <option value="Instrutor">Instrutor</option>
                                <option value="Aluno" selected>Aluno</option>
                            </select>
                        </div>
                        {/* Input for the username */}
                        <div className="textBox">
                            <h2>Nome do usuário</h2>
                            <input type="text" onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        {/* Input for the user password */}
                        <div className="textBox">
                            <h2>Senha do usuário</h2>
                            <input type="password" onChange={(e) => setUserPassword(e.target.value)}/>
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
                                <option value="#9E2896" style={{ color: "#9E2896" }}>Roxo</option>
                                <option value="#00884A" style={{ color: "#00884A" }}>Verde</option>
                                <option value="#18837E" style={{ color: "#18837E" }}>Verde-água</option>
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
                                            setAreasModal(false);
                                        },
                                    },
                                    {
                                        name: "Excluir",
                                        onClick: () => {
                                            setSelectedAreaId(area.id);
                                            setExcludeAreaModal(true);
                                            setAreasModal(false);
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
                            <input type="text" value={areaName} onChange={(e) => setAreaName(e.target.value)}/>
                        </div>
                        {/* Select for the area color */}
                        <div className="textBox">
                            <h2>Selecione a cor da área</h2>
                            <select name="" id="" className="selectFilter" value={areaColor}
                                onChange={(e) => setAreaCor(e.target.value)}
                            // style={{ color: cores[cor] }}
                            >
                                <option value="#9E2896" style={{ color: "#9E2896" }}>Roxo</option>
                                <option value="#00884A" style={{ color: "#00884A" }}>Verde</option>
                                <option value="#18837E" style={{ color: "#18837E" }}>Verde-água</option>
                            </select>
                        </div>

                        <Button ButtonTitle={"Enviar"}  onClose={() => editArea(selectedAreaId, {name: areaName, color: areaColor})}>
                        </Button>
                    </div>
                </div>
            )}

            {/* Modal to exclude the area */}
            {excludeAreaModal && (
                <div className="modalExcludeOverlay" onClick={() => setExcludeAreaModal(false)}>
                    <div className="modalExcludeContainer" onClick={(e) => e.stopPropagation()} >
                        <div className="redString"></div>
                        <p>Deseja excluir a área {areaName}?</p>

                        <div className="buttonsBox">
                            <ButtonExclude ButtonTitle={"Excluir"} onClose={() => {deleteAreas(selectedAreaId);}}></ButtonExclude>
                            <br />
                            <ButtonCancel ButtonTitle={"Cancelar"} onClose={() => setExcludeAreaModal(false)}></ButtonCancel>
                        </div>
                    </div>
                </div>
            )}


        </>
    )
}
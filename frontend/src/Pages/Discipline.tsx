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
import type { registerUserDTO, resetPasswordDTO, showStudentDTO, UserType } from "../Types/user";
import { createUser, getUsers, resetPassword, deleteStudent, deleteInstructor, deleteAdmin } from "../Services/userService";


export function Discipline() {
    //Variables to navigate and open modals
    const navigate = useNavigate();
    const [disciplines, setDisciplines] = useState<DisciplineDTO[]>([])


    const [newDisciplineModal, setNewDisciplineModal] = useState(false);
    const [usersModal, setUsersModal] = useState(false);
    const [newAreaModal, setNewAreaModal] = useState(false);
    const [areasModal, setAreasModal] = useState(false);
    const [newUserModal, setNewUserModal] = useState(false);
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
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [selectedUserType, setSelectedUserType] = useState<UserType | null>(null);

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
            await createArea(data);
            await loadAreas();
            toast.success("Área criada com sucesso!");

            setNewAreaModal(false);
            setAreaName("")
        } catch (error) {
            toast.error("Não foi possivel criar a área!");
            console.error(error);
        }
    }

    async function editArea(id: number | null, data: updateAreaDTO) {
        if (id === null) {
            console.log("No area selected");
            return;
        }

        try {
            await updateArea(id, data);
            await loadAreas();
            toast.success("Área editada com sucesso!");

            setEditAreaModal(false);
            setAreaName("")
        } catch (error: any) {
            toast.error("Não foi possivel editar a área!");
            console.log(error.response?.status);
            console.log(error.response?.data);
        }
    }

    async function deleteAreas(id: number | null) {
        if (id === null) {
            console.log("No area selected");
            return;
        }

        try {
            await deleteArea(id);
            await loadAreas();
            toast.success("Área deletada com sucesso!");

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
    const [areaId, setAreaId] = useState<number | null>(null);


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
            await createDisciplineService(data);
            toast.success("Disciplina criada com sucesso!");

            await loadDisciplines();
            setNewDisciplineModal(false);
            setDisciplineName("");
            setAreaId(null);
        } catch (error) {
            toast.error("Não foi possivel criar a disciplina!");
            console.error(error);
        }
    }
    function handleCreateDiscipline() {
        if (!disciplineName || areaId === null) {
            toast.error("Preencha o nome e selecione uma área.");
            return;
        }

        createDisc({
            name: disciplineName,
            areaID: areaId
        });
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

    useEffect(() => {
        loadDisciplines();
    }, [areas]);

    useEffect(() => {
        if (usersModal) {
            loadUsers();
        }
    }, [usersModal]);

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
            console.log(data);
            const response = await createUser(data);

            await loadUsers();
            setNewUserModal(false);
            setUsername("");
            setNewPassword("");
            setUserPassword("");
            setRepeatPassword("");
            setUserType("STUDENT");
            setNewDisciplineModal(false);
            toast.success("Usuário criado com sucesso!");
        } catch (error: any) {
            console.log(error.response.data);
        }
    }

    async function handleResetPassword() {
        if (selectedUserId === null || selectedUserType === null) {
            console.log("No user selected");
            return;
        }

        const data: resetPasswordDTO = {
            newPassword,
            repeatPassword,
            userType: selectedUserType
        };

        console.log("DATA ENVIADA:", data);
        console.log("ID ALVO:", selectedUserId);

        try {
            const response = await resetPassword(data, selectedUserId);

            console.log(response);

            setNewPassword("");
            setRepeatPassword("");
            setSelectedUserId(null);
            setSelectedUserType(null);
            setResetPasswordModal(false);

            toast.success("Nova senha criada com sucesso!");
        } catch (error) {
            console.log(error);
            toast.error("Não foi possível redefinir a senha");
        }
    }


    async function deleteUser(id: number | null, type: UserType | null) {
        if (id === null || type === null) {
            console.log("No user selected");
            return;
        }

        try {
            if (type === "STUDENT") {
                await deleteStudent(id);
            }
            else if (type === "INSTRUCTOR") {
                await deleteInstructor(id);
            }
            else if (type === "ADMIN") {
                await deleteAdmin(id);
            }

            await loadUsers();

            setSelectedUserId(null);
            setSelectedUserType(null);
            setUsername("");
            setExcludeUserModal(false);

            toast.success("Usuário deletado com sucesso!");
        } catch (error) {
            console.log(error);
            toast.error("Não foi possível deletar o usuário!");
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
                            reload={loadDisciplines}
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
                                value={areaId ?? ""}
                                onChange={(e) =>
                                    setAreaId(e.target.value === "" ? null : Number(e.target.value))
                                }
                            >
                                <option value="">Selecione uma área</option>

                                {areas.map((area) => (
                                    <option key={area.id} value={area.id}>
                                        {area.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Button ButtonTitle={"Enviar"} onClose={handleCreateDiscipline}></Button>
                    </div>
                </div>
            )}
            {/* -------------------------------------------------------- USERS MODALS -------------------------------------------------------- */}

            {/* Modal to create a user */}
            {(newUserModal && (isAdmin || isInstructor)) && (
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
            {(usersModal && (isAdmin || isInstructor)) && (
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
                                <RowItem key={`${users.userType}-${users.id}`} color={"#000000"}>
                                    <div className="itemText">
                                        <p>{users.username} | {users.userType}</p>
                                    </div>
                                    {/* Ignore the error, it is working */}
                                    <MoreOpt
                                        size={25}
                                        data={[
                                            {
                                                name: "Resetar senha",
                                                onClick: () => {
                                                    setSelectedUserId(users.id);
                                                    setSelectedUserType(users.userType);
                                                    setUsername(users.username);
                                                    setResetPasswordModal(true);
                                                    setUsersModal(false);
                                                },
                                                color: "red"
                                            },
                                            {
                                                name: "Excluir",
                                                onClick: () => {
                                                    setSelectedUserId(users.id);
                                                    setUsername(users.username);
                                                    setSelectedUserType(users.userType);
                                                    setExcludeUserModal(true);
                                                    setUsersModal(false);
                                                },
                                                color: "red"
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

            {/* Modal to exclude the user */}
            {(excludeUserModal && (isAdmin || isInstructor)) && (
                <div className="modalExcludeOverlay" onClick={() => setExcludeUserModal(false)}>
                    <div className="modalExcludeContainer" onClick={(e) => e.stopPropagation()} >
                        <div className="redString"></div>
                        <p>Deseja excluir o usuário {username}?</p>

                        <div className="buttonsBox">
                            <ButtonExclude ButtonTitle={"Excluir"} onClose={() => deleteUser(selectedUserId, selectedUserType)}></ButtonExclude>
                            <br />
                            <ButtonCancel ButtonTitle={"Cancelar"} onClose={() => {
                                setExcludeUserModal(false);
                                setSelectedUserId(null);
                                setSelectedUserType(null);
                                setUsername("");
                            }}></ButtonCancel>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal to reset a user password */}
            {(resetPasswordModal && (isAdmin || isInstructor)) && (
                <div className="modalOverlay" onClick={() => setResetPasswordModal(false)}>
                    <div className="modalContainer" onClick={(e) => e.stopPropagation()}>

                        <div className="titleContainer">
                            <h1>Resetar senha</h1>
                            <ButtonClose size={40} onClose={() => setResetPasswordModal(false)} />
                        </div>

                        <p>Resetar senha do usuário {username}?</p>

                        <div className="textBox">
                            <h2>Nova senha</h2>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <div className="textBox">
                            <h2>Confirmar nova senha</h2>
                            <input
                                type="password"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                            />
                        </div>

                        <div className="buttonsBox">
                            <ButtonExclude
                                ButtonTitle={"Resetar"}
                                onClose={handleResetPassword}
                            />
                            <br />
                            <ButtonCancel
                                ButtonTitle={"Cancelar"}
                                onClose={() => {
                                    setResetPasswordModal(false);
                                    setSelectedUserId(null);
                                    setSelectedUserType(null);
                                    setNewPassword("");
                                    setRepeatPassword("");
                                    setUsername("");
                                }}
                            />
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
                                <RowItem key={area.id} color={area.color}>
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

                        <Button ButtonTitle={"Enviar"} onClose={() => editArea(selectedAreaId, { name: areaName, color: areaColor })}>
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
                            <ButtonExclude ButtonTitle={"Excluir"} onClose={() => { deleteAreas(selectedAreaId); }}></ButtonExclude>
                            <br />
                            <ButtonCancel ButtonTitle={"Cancelar"} onClose={() => setExcludeAreaModal(false)}></ButtonCancel>
                        </div>
                    </div>
                </div>
            )}


        </>
    )
}
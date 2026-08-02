import "./Styles/discipline.css";
import "../Pages/Styles/Modals.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MoreOpt } from "./MoreOpt";
import { Button } from "./Button";
import { ButtonClose } from "./ButtonClose";
import { ButtonExclude } from "./ButtonExclude";
import { ButtonCancel } from "./ButtonCancel";
import { useAuth } from "../Contexts/AuthContext";
import { deleteDiscipline, updateDiscipline } from "../Services/disciplinesService";
import type { AreaDTO } from "../Types/area";
import { getAreas } from "../Services/areasService";
import type { DisciplineDTO } from "../Types/discipline";
import { toast } from "react-toastify";

interface DisciplineCompProps {
    Discipline: DisciplineDTO;
}

export function DisciplineComp({ Discipline } : DisciplineCompProps) {
    const navigate = useNavigate();
    //Variables to open the modals
    const [editModal, setEditModal] = useState(false);
    const [excludeModal, setExcludeModal] = useState(false);

    //Variables to control the users and its interactions
    const { user } = useAuth();
    const isAdmin = user?.role === "ADMIN";
    const isInstructor = user?.role === "INSTRUCTOR";
    
    //Options for the options buttons to open the right modal
    const options = [
        {
            name: "Editar disciplina",
            onClick: () => setEditModal(true)
        },
        {
            name: "Excluir disciplina",
            onClick: () => setExcludeModal(true),
            color: "red"
        },
    ];

    const [disciplineName, setDisciplineName] = useState(Discipline.name);
    const [areaId, setAreaId] = useState(Discipline.area.id);
    const [areas, setAreas] = useState<AreaDTO[]>([]);

    async function editDiscipline() {
        try {
            await updateDiscipline(Discipline.id, {
                name: disciplineName,
                areaID: areaId
            });
            toast.success("Disciplina editada com sucesso!");
            
            setDisciplineName("")
            setEditModal(false);
        } catch (error) {
            toast.error("Não foi possivel editar a disciplina!");
            console.error(error);
        }
    }

    async function removeDiscipline() {
        try {
            await deleteDiscipline(Discipline.id);
            toast.success("Disciplina deletada com sucesso!");

            setExcludeModal(false);
        } catch (error) {
            toast.error("Não foi possivel deletar a disciplina!");
            console.error(error);
        }
    }

    async function loadAreas() {
            try {
                const response = await getAreas();
                setAreas(response);
            } catch (error) {
                console.error(error);
            }
    }

    useEffect(() => {
        loadAreas();
    });

    return (
        <> 
        {/* Main box for the hole discipline to render with the right options */}
        <div className="disciplineBox">
            <div className="boxColor" style={{ backgroundColor: Discipline.area.color }} onClick={() => navigate('/Content')}></div>
            <div className="whiteBox">
                <div onClick={() => navigate(`/Content/${Discipline.id}`)} style={{height: '100%'}}>
                    <h1>{Discipline.name}</h1>
                    <h2>{Discipline.area.name}</h2>
                </div>
                {(isAdmin || isInstructor) &&
                    <MoreOpt data={options} size={30}></MoreOpt>
                }
            </div>
        </div>

        {/* Modal to edit the discipline */}
        {editModal && (
             <div className="modalOverlay" onClick={() => setEditModal(false)}>
                <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                    {/* Title and close button box */}
                    <div className="titleContainer">
                        <h1>Editar disciplina</h1>
                        <ButtonClose size={40} onClose={() => setEditModal(false)}></ButtonClose>
                    </div>
                    {/* Input for the discipline name */}
                    <div className="textBox">
                        <h2>Nome da disciplina</h2>
                        <input type="text" value={disciplineName} onChange={(e) => setDisciplineName(e.target.value)}/>
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

                    <Button ButtonTitle={"Enviar"} onClose={editDiscipline}></Button>
                </div>
            </div>
        )}

        {/* Modal to exclude the discipline */}
        {excludeModal && (
             <div className="modalExcludeOverlay" onClick={() => setExcludeModal(false)}>
                <div className="modalExcludeContainer" onClick={(e) => e.stopPropagation()} >
                <div className="redString"></div>
                    <p>Deseja excluir a disciplina {Discipline.name}?</p>

                    <div className="buttonsBox">
                        <ButtonExclude ButtonTitle={"Excluir"} onClose={removeDiscipline}></ButtonExclude>
                        <br />
                        <ButtonCancel ButtonTitle={"Cancelar"} onClose={() => setExcludeModal(false)}></ButtonCancel>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}
import "../Styles/Views.css"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ButtonIcon } from "../../Components/ButtonIcon"
import { MoreOpt } from "../../Components/MoreOpt"
import { RowItem } from "../../Components/RowItem"
import { useAuth } from "../../Contexts/AuthContext"
import { Button } from "../../Components/Button"
import { ButtonClose } from "../../Components/ButtonClose"
import { ButtonCancel } from "../../Components/ButtonCancel"
import { ButtonExclude } from "../../Components/ButtonExclude"
import LessonSelect from "../../Components/LessonSelect"
import type { CompetenceDTO } from "../../Types/competence"
import { toast } from "react-toastify"
import { getDisciplineExams } from "../../Services/disciplinesService"
import type { DisciplineDTO, viewExamsDTO } from "../../Types/discipline"
import { isAxiosError } from "axios"
import type { updateExamDTO } from "../../Types/exam"
import { deleteExam } from "../../Services/examsService"


interface ExamsViewProps {
    discipline: DisciplineDTO;
}

export function ExamsView({ discipline }: ExamsViewProps ) {
    //Variables to navigate and open modals
    const navigate = useNavigate();
    const [editTestModal, setEditTestModal] = useState(false);
    const [excludeTestModal, setExcludeTestModal] = useState(false);

    const [allCompetences, setAllCompetences] = useState<CompetenceDTO[]>([]);

    //Options for the option buttons
    const options = [
        {
            name: "Editar avaliação",
            onClick: () => setEditTestModal(true)
        },
        {
            name: "Excluir avaliação",
            onClick: () => setExcludeTestModal(true),
            color: "red"
        }
    ]

    //Variables to control the users and its interactions
    const { user } = useAuth();
    const isAdmin = user?.role === "ADMIN";
    const isInstructor = user?.role === "INSTRUCTOR";
    
    const [exams, setExams] = useState<viewExamsDTO[]>([]);
    const [selectedExam, setSelectedExam] = useState<viewExamsDTO | null>(null);
    const [loading, setLoading] = useState(true);

    const { discipline_id } = useParams<{ discipline_id: string }>();
    console.log(discipline_id)
    const [examName, setExamName] = useState("");
    const [examFile, setExamFile] = useState<File | null>(null);
    const [examCompetences, setExamCompetences] = useState<CompetenceDTO[]>([]);

    async function loadExams() {
        try {
            console.log(discipline);
            const response = await getDisciplineExams(Number(discipline_id));
            console.log(response)

            setExams(response.exams);

        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response?.status === 404) {
                    toast.error("404 - Disciplina não encontrada.");
                    return;
                }

                if (error.response?.status === 500) {
                    toast.error("500 - Erro de servidor.");
                    return;
                }
            }

            console.error(error);
            toast.error("Erro ao carregar avaliações.");

        } finally {
            setLoading(false);
        }
    }

    async function editExam(data: updateExamDTO) {
        
    }

    async function excludeExam() {
        if (!selectedExam) return;

        try {
            await deleteExam(selectedExam.id);

            toast.success("Avaliação excluída com sucesso.");

            setSelectedExam(null);
            setExcludeTestModal(false);

        } catch (error) {
            console.error(error);

            if (isAxiosError(error)) {
                switch (error.response?.status) {
                    case 404:
                        toast.error("404 - Avaliação não encontrada.");
                        return;

                    case 500:
                        toast.error("500 - Erro de servidor.");
                        return;
                }
            }

            toast.error("Erro ao excluir avaliação.");
        }
    }

    useEffect(() => {
        loadExams();
    }, []);

    return (
        <>
            {/* Items shown on the specified tab */}
            <div className="view-page">
                {exams.map((exam) => (
                    <RowItem
                        key={exam.id}
                        onClick={() => {
                        }}
                        color="var(--acqua)"
                        size="--medium"
                        button={true}
                        actions={
                            <>
                                {(isAdmin || isInstructor) &&
                                    <MoreOpt size={22} data={
                                        [
                                            {
                                                name: "Editar avaliação",
                                                onClick: () => {
                                                    setEditTestModal(true)
                                                }
                                            },
                                            {
                                                name: "Excluir avaliação",
                                                onClick: () => {
                                                    setExcludeTestModal(true)
                                                },
                                                color: "red"
                                            }
                                        ]
                                    } />
                                }
                            </>
                        }>

                        <span>{exam.name}</span>
                    </RowItem>
                ))}
            </div>

            {/* Modal to edit the test */}
            {editTestModal && (
                            <div className="modalOverlay" onClick={() => { setEditTestModal(false)}}>
                                <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                                    {/* Title and close button box */}
                                    <div className="titleContainer">
                                        <h1>Editar avaliação</h1>
                                        <ButtonClose size={40} onClose={() => { setEditTestModal(false) }}></ButtonClose>
                                    </div>
                                    {/* Input for test name */}
                                    <div className="textBox">
                                        <h2>Nome da avaliação</h2>
                                        <input type="text" value={examName} onChange={(e) => setExamName(e.target.value)} />
                                    </div>
                                    {/* Input to select the test file */}
                                    <div className="textBox">
                                        <h2>Selecione o arquivo</h2>
                                        <input type="file" onChange={(e) => {
                                            const file = e.target.files?.[0] ?? null;
                                            setExamFile(file);
                                        }} />
                                    </div>
                                    {/* Search for competence and its display */}
                                    <div className="textBox">
                                        <h2>Selecione as competências</h2>
            
                                        <div className='attachments' >
                                            {/* Component used to search a competence */}
                                            <LessonSelect lessons={allCompetences} onAdd={(competence) => {
                                                setExamCompetences((prev) => {
                                                    if (prev.some((c) => c.id === competence.id)) {
                                                        toast.warning("Essa competência já foi adicionada.");
                                                        return prev;
                                                    }
            
                                                    return [...prev, competence];
                                                });
                                            }} />
                                            <br />
                                            <div className="scrollBox">
            
                                                {examCompetences.map((competence) => (
                                                    <RowItem
                                                        key={competence.id}
                                                        type="competence"
                                                        actions={
                                                            <>
                                                                <ButtonClose
                                                                    size={18}
                                                                    onClose={() => {
                                                                        // ação para remover a competência
                                                                    }}
                                                                />
                                                            </>
                                                        }
                                                    >
                                                        <div>{competence.name}</div>
                                                    </RowItem>
                                                ))}
                                            </div>
                                        </div>
            
                                    </div>
            
                                    <Button ButtonTitle={"Enviar"} onClose={() => editExam({
                                         name: examName, files: examFile ? [examFile] : [], disciplineId: examDiscipline, competencesId: examCompetences}
                                    )}></Button>
                                </div>
                            </div>
                        )}

            {/* Modal to exclude the test */}
            {excludeTestModal && (
                <div className="modalExcludeOverlay" onClick={() => setExcludeTestModal(false)}>
                    <div className="modalExcludeContainer" onClick={(e) => e.stopPropagation()} >
                        <div className="redString"></div>
                        <p>Deseja excluir a avaliação {selectedExam?.name}?</p>

                        <div className="buttonsBox">
                            <ButtonExclude ButtonTitle={"Excluir"} onClose={() => excludeExam()}></ButtonExclude>
                            <br />
                            <ButtonCancel ButtonTitle={"Cancelar"} onClose={() => setExcludeTestModal(false)}></ButtonCancel>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
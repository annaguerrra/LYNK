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
import type { RegisterExamDTO, updateExamDTO } from "../../Types/exam"
import { deleteExam, updateExam } from "../../Services/examsService"


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
    
    const [viewExamModal, setViewExamModal] = useState(false);
    const [exams, setExams] = useState<RegisterExamDTO[]>([]);
    const [selectedExam, setSelectedExam] = useState<RegisterExamDTO | null>(null);
    const [loading, setLoading] = useState(true);

    const { discipline_id } = useParams<{ discipline_id: string }>();
    console.log(discipline_id)
    const [examName, setExamName] = useState("");
    const [examFile, setExamFile] = useState<File[]>([]);
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


    async function editExam(id: number, data: updateExamDTO) {
        if (!discipline) return;
        if (!id) return;
        
        try {
            const examData = new FormData();

            examData.append("name", data.name);
            examData.append("disciplineId", data.disciplineId.toString());

            data.files.forEach((file) => {
                examData.append("files", file);
            });

            data.competencesId.forEach((id) => {
                examData.append("competencesId", id.toString());
            });

            const updatedExam = await updateExam(id, examData);

            toast.success("Avaliação atualizada com sucesso!");

            setExamName("");
            setExamFile(null);
            setExamCompetences([]);
            setEditTestModal(false)
            loadExams();

            return updatedExam;
        } catch (error) {
            console.error(error);
            toast.error("Erro ao atualizar a avaliação.");
        }
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
                            setViewExamModal(true)
                            setExamName(exam.name)
                            setExamFile(exam.files)
                        }}
                        color="var(--acqua)"
                        size="--medium"
                        button={true}
                        actions={
                            <>
                                {(isAdmin || isInstructor) &&
                                    <MoreOpt size={22} data={
                                        [
                                            // {
                                            //     name: "Editar avaliação",
                                            //     onClick: () => {
                                            //         setSelectedExam(exam)
                                            //         setExamName(exam.name)
                                            //         setEditTestModal(true)
                                            //     }
                                            // },
                                            {
                                                name: "Excluir avaliação",
                                                onClick: () => {
                                                    setSelectedExam(exam)
                                                    setExamName(exam.name)
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

            {/* Modal to view the test */}
            {viewExamModal && (
                <div className="modalOverlay" onClick={() => { setViewExamModal(false)}}>
                    <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                        {/* Title and close button box */}
                        <div className="titleContainer">
                            <h1>Visualizar avaliação</h1>
                            <ButtonClose size={40} onClose={() => { setViewExamModal(false) }}></ButtonClose>
                        </div>
                        {/* Input for test name */}
                        <div className="textBox">
                            <h2>{examName}</h2>
                        </div>
                        {/* Input to select the test file */}
                        <div className="textBox">
                            <h2>Arquivos</h2>
                            <div className="scrollBox">
                            {selectedExam?.files.map(file => (
                                <RowItem
                                    key={file.id}
                                    type="attachment"
                                >
                                    <a
                                        href={file.url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {file.name}
                                    </a>
                                </RowItem>
                            ))}
                            </div>
                        </div>
                        {/* Search for competence and its display */}
                        <div className="textBox">
                            <h2>Competências</h2>

                            <div className='attachments' >
                                {/* Component used to search a competence */}
                                
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
                            <div></div>
                    </div>
                </div>
            )}


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

                        <Button ButtonTitle={"Enviar"} onClose={() => editExam(selectedExam.id, {
                            name: examName, files: examFile ? [examFile] : [], disciplineId: discipline.id, competencesId: examCompetences.map(c => c.id)}
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
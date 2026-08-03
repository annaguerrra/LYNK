import "./Styles/Content.css"
import "./Styles/Class.css"
import { useEffect, useState } from "react";
import { ButtonBack } from "../Components/ButtonBack";
import { Header } from "../Components/Header";
import { TabNavigation } from "../Components/TabNavigation";
import { ClassesView } from "./ContentViews/ClassesView";
import { CompetencesView } from "./ContentViews/CompetencesView";
import { ExamsView } from "./ContentViews/ExamsView";
import { MoreOpt } from "../Components/MoreOpt";
import { Button } from "../Components/Button";
import { ButtonClose } from "../Components/ButtonClose";
import { useNavigate } from "react-router-dom";
import { RowItem } from "../Components/RowItem";
import LessonSelect from "../Components/LessonSelect";
import { useParams } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { assignDisciplineCompetence, getDisciplineById, getDisciplineCompetences } from "../Services/disciplinesService";
import type { DisciplineDTO } from "../Types/discipline";
import { createClassService } from "../Services/classesService";
import ActivityIndicator from "../Components/ActivityIndicator";
import type { CompetenceDTO } from "../Types/competence";
import { createCompetenceService } from "../Services/competencesService";
import type { ClassDTO } from "../Types/class";
import { createExam } from "../Services/examsService";
import type { registerExamDTO } from "../Types/exam";
import type { UploadedFileDTO } from "../Types/attachment";



export function Content() {
    //Variables to navigate and open modals
    const navigate = useNavigate()

    const { discipline_id } = useParams<{ discipline_id: string }>();


    const [allCompetences, setAllCompetences] = useState<CompetenceDTO[]>([]);
    
    
    
    const [selectedTab, setSelectedTab] = useState("classes");
    const [newTest, setNewTest] = useState(false);
    const [newCompetence, setNewCompetence] = useState(false);
    const [editCompetence, setEditCompetence] = useState(false);

    const [competenceName, setCompetenceName] = useState("");

    const [discipline, setDiscipline] = useState<DisciplineDTO | null>(null);

    //Variables to control the users and its interactions
    const { user } = useAuth();
    const isAdmin = user?.role === "ADMIN";
    const isInstructor = user?.role === "INSTRUCTOR";

    //Options for the option buttons
    const options = [
        {
            name: "Nova avaliação",
            onClick: () => setNewTest(true)
        },
        {
            name: "Nova competência",
            onClick: () => setNewCompetence(true)
        },
        {
            name: "Nova aula",
            onClick: () => createClass()
        },
    ];

    //Tab options
    const tabs = [
        { id: "classes", label: "Aulas" },
        { id: "competences", label: "Competências" },
        { id: "exams", label: "Avaliações", allowedRoles: ["ADMIN", "INSTRUCTOR"] },
    ];


    const templateContent = `# Título da Aula

        Introdução breve sobre o tema da aula.

        ## Conteúdo

        Explique os principais pontos abordados.

        ## Exemplo

        \`\`\`
        Exemplo ou demonstração.
        \`\`\`

        ## Exercício

        Descreva uma atividade para praticar.

        ## Resumo

        Principais aprendizados da aula.
    `


    async function createClass() {
        if (!discipline) return;

        try {

            const createdClass = await createClassService({
                name: "Nova Aula",
                content: templateContent,
                disciplineId: discipline.id
            });

            navigate(`/Class/${createdClass.id}`);

        } catch (error) {
            console.error("Erro ao criar aula:", error);
            toast.error("Erro ao criar a aula.");
            return;
        }

    }


    async function createCompetence() {
        try {

            if (!competenceName) {
                toast.warning("Nome da competência não pode ser nulo!")
                return;
            }

            const competence = await createCompetenceService(competenceName);

            await assignDisciplineCompetence({
                competencyId: competence.id,
                disciplineId: discipline.id,
            });

            setCompetenceName("")
            setNewCompetence(false);
        } catch (error) {
            console.error("Erro ao criar e vincular competência:", error);
        }
    }

    const [examName, setExamName] = useState("");
    const [examDiscipline, setExamDiscipline] = discipline_id;
    const [examFile, setExamFile] = useState<UploadedFileDTO | null>(null);
    const [examCompetences, setExamCompetences] = useState<CompetenceDTO[]>([]);
    
    async function creatingExam(data: registerExamDTO) {
        if (!discipline) return;

        try {
            const createdExam = await createExam(data);
            toast.success("Avaliação criada com sucesso!");

            setExamName("");
            return createdExam;
        } catch (error) {
            console.log(error)
            toast.error("Erro ao criar a avaliação.");
            return;
        }

    }




    async function loadCompetencesByDiscipline(disciplineId: number) {
        try {
            const response = await getDisciplineCompetences(disciplineId);
            setAllCompetences(response);

        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response?.status === 500) {
                    toast.error("500 - Erro de servidor.");
                    return;
                }
            }

            console.error(error);
            toast.error("Erro ao carregar competências.");
        }

    }

    async function loadContent(id: number) {
        try {
            const response = await getDisciplineById(id);

            setDiscipline(response);
            loadCompetencesByDiscipline(response.id);

        } catch (error) {
            if (isAxiosError(error)) {

                if (error.response?.status === 404) {
                    toast.error("404 - Disciplina não encontrada.");
                    navigate("/error");
                    return;
                }

                if (error.response?.status === 500) {
                    toast.error("500 - Erro de servidor.");
                    return;
                }
            }

            console.error(error);
            toast.error("Erro ao carregar disciplina.");
        }
    }


    useEffect(() => {
        if (!discipline_id) return;

        const id = Number(discipline_id);

        if (isNaN(id)) {
            navigate("/error");
            return;
        }

        loadContent(id);

    }, [discipline_id]);



    if (!discipline) {
        return (
            <>
                <Header />
                <ActivityIndicator size="large" />
            </>
        );
    }


    return (
        <>
            <Header />

            {/* Whole page */}
            <div className="page">

                {/* Button to go back and more interative options */}
                <div className="headerContent">
                    <div className="startBox">
                        <ButtonBack onClick={() => navigate(-1)} />
                        <span style={{ fontWeight: "bold", fontSize: "30px" }}>{discipline.name}</span>
                    </div>
                    {(isAdmin || isInstructor) &&
                        <MoreOpt data={options} size={30}></MoreOpt>
                    }
                </div>
                <div className="content">
                    {/* Change the content based on the selected tab */}
                    <TabNavigation
                        selected={selectedTab}
                        onChange={setSelectedTab} 
                        tabs={tabs} 
                        userRole={user.role}
                    />

                    {discipline && selectedTab === "classes" && <ClassesView discipline={discipline} />}
                    {discipline && selectedTab === "competences" && <CompetencesView discipline={discipline} />}
                    {discipline && (isAdmin || isInstructor) && selectedTab === "exams" && <ExamsView />}


                </div>
            </div>

            {/* -------------------------------------------------------- TEST MODALS -------------------------------------------------------- */}
            {/* Modal to create a test */}
            {newTest && (
                <div className="modalOverlay" onClick={() => { setNewTest(false)}}>
                    <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                        {/* Title and close button box */}
                        <div className="titleContainer">
                            <h1>Registrar avaliação</h1>
                            <ButtonClose size={40} onClose={() => { setNewTest(false) }}></ButtonClose>
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

                        <Button ButtonTitle={"Enviar"} onClose={() => creatingExam({
                            name: examName, files: examFile ? [examFile] : [], disciplineId: examDiscipline, competencesId: examCompetences}
                        )}></Button>
                    </div>
                </div>
            )}

            {/* -------------------------------------------------------- COMPETENCE MODALS -------------------------------------------------------- */}
            {newCompetence && (
                <div className="modalOverlay" onClick={() => setNewCompetence(false)}>
                    <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                        {/* Title and close button box */}
                        <div className="titleContainer">
                            <h1>Registrar competência</h1>
                            <ButtonClose size={40} onClose={() => {
                                setNewCompetence(false)
                                setCompetenceName("")
                            }
                            }></ButtonClose>
                        </div>
                        {/* Input for the competence name */}
                        <div className="textBox">
                            <h2>Nome da competência</h2>
                            <input type="text" value={competenceName} onChange={(e) => setCompetenceName(e.target.value)} />
                        </div>

                        <Button ButtonTitle={"Enviar"} onClose={() => createCompetence()}></Button>
                    </div>
                </div>
            )}

            {editCompetence && (
                <div className="modalOverlay" onClick={() => setEditCompetence(false)}>
                    <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                        {/* Title and close button box */}
                        <div className="titleContainer">
                            <h1>Editar competência</h1>
                            <ButtonClose size={40} onClose={() => setEditCompetence(false)}></ButtonClose>
                        </div>
                        {/* Input for the competence name */}
                        <div className="textBox">
                            <h2>Nome da competência</h2>
                            <input type="text" />
                        </div>

                        <Button ButtonTitle={"Enviar"} onClose={() => setEditCompetence(false)}></Button>
                    </div>
                </div>
            )}

            {/* {excludeCompetenceModal && (
                <div className="modalExcludeOverlay" onClick={() => setExcludeCompetenceModal(false)}>
                    <div className="modalExcludeContainer" onClick={(e) => e.stopPropagation()} >
                        <div className="redString"></div>
                        <p>Deseja excluir a competência?</p>

                        <div className="buttonsBox">
                            <ButtonExclude ButtonTitle={"Excluir"} onClose={() => setExcludeCompetenceModal(false)}></ButtonExclude>
                            <br />
                            <ButtonCancel ButtonTitle={"Cancelar"} onClose={() => setExcludeCompetenceModal(false)}></ButtonCancel>
                        </div>
                    </div>
                </div>
            )} */}
        </>
    );
}
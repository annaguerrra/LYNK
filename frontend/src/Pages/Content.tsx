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
import { ButtonCancel } from "../Components/ButtonCancel";
import { ButtonClose } from "../Components/ButtonClose";
import { ButtonExclude } from "../Components/ButtonExclude";
import { useNavigate } from "react-router-dom";
import { RowItem } from "../Components/RowItem";
import LessonSelect from "../Components/LessonSelect";
import { useParams } from "react-router-dom";
import api from "../Services/api";
import { useAuth } from "../Auth/AuthContext";

export function Content() {
    //Variables to navigate and open modals
    const navigate = useNavigate()
    const [selectedTab, setSelectedTab] = useState("classes");
    const [newTest, setNewTest] = useState(false);
    const [editTest, setEditTest] = useState(false);
    const [newCompetence, setNewCompetence] = useState(false);
    const [editCompetence, setEditCompetence] = useState(false);
    const [excludeTestModal, setExcludeTestModal] = useState(false);
    const [excludeCompetenceModal, setExcludeCompetenceModal] = useState(false);
    const [discipline, setDiscipline] = useState(null);


    const { discipline_id } = useParams();
    
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
            onClick: () => navigate('/Class')
        },
    ];

    //Tab options
    const tabs = [
        { id: "classes", label: "Aulas" },
        { id: "competences", label: "Competências" },
        { id: "exams", label: "Avaliações" },
    ];

    if (!discipline) {
        return <div>Carregando...</div>;
    }

    async function loadContent() {
        const response = await api.get(`/discipline/${discipline_id}`);
        setDiscipline(response.data)
    }

    useEffect(() => {

        if (discipline_id) {
            loadContent();
        }

    }, [discipline_id]);


    return (
        <>
            <Header />

            {/* Whole page */}
            <div className="page">

                {/* Button to go back and more interative options */}
                <div className="headerContent">
                    <div className="startBox">
                        <ButtonBack onClick={() => navigate("/disciplines")} />
                        <span style={{ fontWeight: "bold", fontSize: "30px" }}>{discipline.name}</span>
                    </div>
                    {isAdmin || isInstructor &&
                        <MoreOpt data={options} size={30}></MoreOpt>
                    }
                </div>
                <div className="content">
                    {/* Change the content based on the selected tab */}
                    <TabNavigation
                        selected={selectedTab}
                        onChange={setSelectedTab} tabs={tabs} />

                    {selectedTab === "classes" && <ClassesView />}
                    {selectedTab === "competences" && <CompetencesView competences={discipline.competences ?? []} />}
                    {selectedTab === "exams" && <ExamsView />}


                </div>
            </div>

            {/* -------------------------------------------------------- TEST MODALS -------------------------------------------------------- */}
            {/* Modal to create a test */}
            {newTest && (
                <div className="modalOverlay" onClick={() => setNewTest(false)}>
                    <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                        {/* Title and close button box */}
                        <div className="titleContainer">
                            <h1>Registrar avaliação</h1>
                            <ButtonClose size={40} onClose={() => setNewTest(false)}></ButtonClose>
                        </div>
                        {/* Input for test name */}
                        <div className="textBox">
                            <h2>Nome da avaliação</h2>
                            <input type="text" />
                        </div>
                        {/* Input to select the discipline */}
                        <div className="textBox">
                            <h2>Selecione a disciplina</h2>
                            <select name="" id="">
                                <option value="Tecnologia" selected></option>
                            </select>
                        </div>
                        {/* Input to select the test file */}
                        <div className="textBox">
                            <h2>Selecione o arquivo</h2>
                            <input type="file" />
                        </div>
                        {/* Search for competence and its display */}
                        <div className="textBox">
                            <h2>Selecione as competências</h2>

                            <div className='attachments' >
                                {/* Component used to search a competence */}
                                <LessonSelect />
                                <br />
                                <div className="scrollBox">

                                    <RowItem
                                        type='competence'
                                        actions={
                                            <>
                                                <ButtonClose size={18} onClose={() => { }} />
                                            </>
                                        } >
                                        <div>Fazer sei la o que, comepencia de não sei o que mais </div>

                                    </RowItem>
                                    <RowItem
                                        type='competence'
                                        actions={
                                            <>
                                                <ButtonClose size={18} onClose={() => { }} />
                                            </>
                                        } >
                                        <div>Teste de nome para o componente usado para representar uma competencia</div>

                                    </RowItem>
                                </div>
                            </div>

                        </div>

                        <Button ButtonTitle={"Enviar"} onClose={() => setNewTest(false)}></Button>
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
                            <ButtonClose size={40} onClose={() => setNewCompetence(false)}></ButtonClose>
                        </div>
                        {/* Input for the competence name */}
                        <div className="textBox">
                            <h2>Nome da competência</h2>
                            <input type="text" />
                        </div>

                        <Button ButtonTitle={"Enviar"} onClose={() => setNewCompetence(false)}></Button>
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

            {excludeCompetenceModal && (
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
            )}
        </>
    );
}
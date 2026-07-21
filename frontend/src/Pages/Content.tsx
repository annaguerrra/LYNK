import "./Styles/Content.css"
import "./Styles/Class.css"
import { useState } from "react";
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

export function Content() {
    const navigate = useNavigate()
    const [selectedTab, setSelectedTab] = useState("classes");
    const [newTest, setNewTest] = useState(false);
    const [editTest, setEditTest] = useState(false);
    const [newCompetence, setNewCompetence] = useState(false);
    const [editCompetence, setEditCompetence] = useState(false);
    const [excludeTestModal, setExcludeTestModal] = useState(false);
    const [excludeCompetenceModal, setExcludeCompetenceModal] = useState(false);

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

    const tabs = [
    { id: "classes", label: "Aulas" },
    { id: "competences", label: "Competências" },
    { id: "exams", label: "Avaliações" },
];

    return (
        <>
            <Header />
            <div className="page">
                <div className="headerContent">
                    <div className="startBox">
                        <ButtonBack onClick={() => navigate("/disciplines")} />
                        <span style={{ fontWeight: "bold", fontSize: "30px" }}>Introdução a Python</span>
                    </div>
                    <MoreOpt data={options} size={30}></MoreOpt>
                </div>
                <div className="content">
                    <TabNavigation
                        selected={selectedTab}
                        onChange={setSelectedTab} tabs={tabs}                    />

                    {selectedTab === "classes" && <ClassesView />}
                    {selectedTab === "competences" && <CompetencesView />}
                    {selectedTab === "exams" && <ExamsView />}


                </div>
            </div>

{/* -------------------------------------------------------- TEST MODALS -------------------------------------------------------- */}
            {newTest && (
                <div className="modalOverlay" onClick={() => setNewTest(false)}>
                <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                    <div className="titleContainer">
                        <h1>Registrar avaliação</h1>
                        <ButtonClose size={40} onClose={() => setNewTest(false)}></ButtonClose>
                    </div>
                    <div className="textBox">
                        <h2>Nome da avaliação</h2>
                        <input type="text"/>
                    </div>
                    <div className="textBox">
                        <h2>Selecione a disciplina</h2>
                        <select name="" id="">
                            <option value="Tecnologia" selected></option>
                        </select>
                    </div>
                    <div className="textBox">
                        <h2>Selecione o arquivo</h2> 
                        <input type="file" />
                    </div>
                    <div className="textBox">
                        <h2>Selecione o arquivo</h2> 
                        
                        <div className='attachments' >
                            <LessonSelect/>
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

                                <RowItem
                                    type='competence'
                                    actions={
                                        <>
                                        <ButtonClose size={18} onClose={() => { }} />
                                        </>
                                    } >
                                    <div>Teste de nome para o componente usado para representar uma competencia</div>
                                    
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

            {editTest && (
                <div className="modalOverlay" onClick={() => setEditTest(false)}>
                <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                    <div className="titleContainer">
                        <h1>Registrar avaliação</h1>
                        <ButtonClose size={40} onClose={() => setEditTest(false)}></ButtonClose>
                    </div>
                    <div className="textBox">
                        <h2>Nome da avaliação</h2>
                        <input type="text" placeholder="Digite o nome da disciplina"/>
                    </div>
                    <div className="textBox">
                        <h2>Selecione a disciplina</h2>
                        <select name="" id="">
                            <option value="Tecnologia" selected></option>
                        </select>
                    </div>
                    <div className="textBox">
                        <h2>Selecione o arquivo</h2> 
                        <input type="file" />
                    </div>
                    {/* <div className="textBox">
                        <h2>Selecione as competências</h2>
                        <select name="" id="">
                            <option value="Tecnologia" selected></option>
                        </select>
                    </div>
                    <div className="scrollBox">
                        <h1>.</h1>
                        <h1>.</h1>
                        <h1>.</h1>
                        <h1>.</h1>
                            
                    </div> */}

                    <Button ButtonTitle={"Enviar"} onClose={() => setEditTest(false)}></Button>
                </div>
                </div>
            )}

            {excludeTestModal && (
                <div className="modalExcludeOverlay" onClick={() => setExcludeTestModal(false)}>
                <div className="modalExcludeContainer" onClick={(e) => e.stopPropagation()} >
                <div className="redString"></div>
                    <p>Deseja excluir a avaliação?</p>

                    <div className="buttonsBox">
                        <ButtonExclude ButtonTitle={"Excluir"} onClose={() => setExcludeTestModal(false)}></ButtonExclude>
                        <br />
                        <ButtonCancel ButtonTitle={"Cancelar"} onClose={() => setExcludeTestModal(false)}></ButtonCancel>
                    </div>
                </div>
            </div>
            )}
{/* -------------------------------------------------------- COMPETENCE MODALS -------------------------------------------------------- */}
            {newCompetence && (
                    <div className="modalOverlay" onClick={() => setNewCompetence(false)}>
                    <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                        <div className="titleContainer">
                            <h1>Registrar competência</h1>
                            <ButtonClose size={40} onClose={() => setNewCompetence(false)}></ButtonClose>
                        </div>
                        <div className="textBox">
                            <h2>Nome da competência</h2>
                            <input type="text"/>
                        </div>

                        <Button ButtonTitle={"Enviar"} onClose={() => setNewCompetence(false)}></Button>
                    </div>
                </div>
            )}

            {editCompetence && (
                    <div className="modalOverlay" onClick={() => setEditCompetence(false)}>
                    <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                        <div className="titleContainer">
                            <h1>Editar competência</h1>
                            <ButtonClose size={40} onClose={() => setEditCompetence(false)}></ButtonClose>
                        </div>
                        <div className="textBox">
                            <h2>Nome da competência</h2>
                            <input type="text"/>
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
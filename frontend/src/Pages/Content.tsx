import "./Styles/Content.css"
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

export function Content() {
    const [selectedTab, setSelectedTab] = useState("exams");
    const [markdown, setMarkdown] = useState("##Olaaa");
    const [newTest, setNewTest] = useState(false);
    const [newCompetence, setNewCompetence] = useState(false);
    const [newClass, setNewClass] = useState(false);

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
            onClick: () => setNewClass(true)
        },
    ];

    return (
        <>
            <Header />
            <div className="page">
                <div className="headerContent">
                    <div className="startBox">
                        <ButtonBack />
                        <span style={{ fontWeight: "bold", fontSize: "30px" }}>Introdução a Python</span>
                    </div>
                    <MoreOpt data={options} size={30}></MoreOpt>
                </div>
                <div className="content">
                    <TabNavigation
                        selected={selectedTab}
                        onChange={setSelectedTab}
                    />

                    {selectedTab === "classes" && <ClassesView />}
                    {selectedTab === "competences" && <CompetencesView />}
                    {selectedTab === "exams" && <ExamsView />}


                </div>
            </div>

{/* -------------------------------------------------------- USERS MODALS -------------------------------------------------------- */}
            {newTest && (
                <div className="modalOverlay" onClick={() => setNewTest(false)}>
                <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                    <div className="titleContainer">
                        <h1>Registrar avaliação</h1>
                        <ButtonClose size={40} onClose={() => setNewTest(false)}></ButtonClose>
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
                    </div>
                    <div className="textBox">
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
                            
                    </div>

                    <Button ButtonTitle={"Enviar"} onClose={() => setNewTest(false)}></Button>
                </div>
                </div>
            )}

            {newCompetence && (
                    <div className="modalOverlay" onClick={() => setNewCompetence(false)}>
                    <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                        <div className="titleContainer">
                            <h1>Registrar disciplina</h1>
                            <ButtonClose size={40} onClose={() => setNewCompetence(false)}></ButtonClose>
                        </div>
                        <div className="textBox">
                            <h2>Nome da disciplina</h2>
                            <input type="text" placeholder="Digite o nome da disciplina"/>
                        </div>
                        <div className="textBox">
                            <h2>Selecione a área de conhecimento</h2>
                            <select name="" id="">
                                <option value="Tecnologia" selected></option>
                            </select>
                        </div>

                        <Button ButtonTitle={"Enviar"} onClose={() => setNewCompetence(false)}></Button>
                    </div>
                </div>
            )}

            {newClass && (
                    <div className="modalOverlay" onClick={() => setNewClass(false)}>
                    <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                        <div className="titleContainer">
                            <h1>Registrar disciplina</h1>
                            <ButtonClose size={40} onClose={() => setNewClass(false)}></ButtonClose>
                        </div>
                        <div className="textBox">
                            <h2>Nome da disciplina</h2>
                            <input type="text" placeholder="Digite o nome da disciplina"/>
                        </div>
                        <div className="textBox">
                            <h2>Selecione a área de conhecimento</h2>
                            <select name="" id="">
                                <option value="Tecnologia" selected></option>
                            </select>
                        </div>

                        <Button ButtonTitle={"Enviar"} onClose={() => setNewClass(false)}></Button>
                    </div>
                </div>
            )}

        </>
    );
}
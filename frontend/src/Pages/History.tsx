import { useNavigate } from "react-router-dom";
import { ButtonBack } from "../Components/ButtonBack";
import { Header } from "../Components/Header";
import { TabNavigation } from "../Components/TabNavigation";
import { useState } from "react";
import { ButtonIcon } from "../Components/ButtonIcon";

export function History() {
    const navigate = useNavigate()
    const [selectedTab, setSelectedTab] = useState("classes");
    const [infoOpen, setInfoOpen] = useState(false)

    const tabs = [
        { id: "disciplines", label: "Disciplinas" },
        { id: "classes", label: "Aulas" },
        { id: "competences", label: "Competências" },
        { id: "exams", label: "Avaliações" },
        { id: "users", label: "Usuários" }
    ];

    return (
        <>
            <Header />
            <div className="page">
                <div className="headerContent">
                    <div className="startBox">
                        <ButtonBack onClick={() => navigate("/disciplines")} />
                        <span style={{ fontWeight: "bold", fontSize: "30px" }}>Histórico</span>
                    </div>
                    <ButtonIcon size={30} icon={"icon-info"} onClick={() => { setInfoOpen(!infoOpen) }} />
                    {infoOpen &&
                        <div className="infoBox">
                            <span>teste</span>
                        </div>
                    }
                </div>
                <div className="content">
                    <TabNavigation
                        selected={selectedTab}
                        onChange={setSelectedTab}
                        tabs={tabs} />

                    {/* {selectedTab === "classes" && <ClassesView />}
                    {selectedTab === "competences" && <CompetencesView />}
                    {selectedTab === "exams" && <ExamsView />} */}


                </div>
            </div>
        </>
    )
}
import { useNavigate } from "react-router-dom";
import { ButtonBack } from "../Components/ButtonBack";
import { Header } from "../Components/Header";
import { TabNavigation } from "../Components/TabNavigation";
import { useState } from "react";
import { ButtonIcon } from "../Components/ButtonIcon";
import { DisciplinesView } from "./HistoryViews/DisciplinesView";

export function History() {
    //Variables to navigate and open modals
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
                    <div className="infoContainer">
                        <ButtonIcon
                            size={30}
                            icon={"icon-info"}
                            onClick={() => setInfoOpen(!infoOpen)}
                        />

                        {infoOpen && (
                            <div className="infoBox">
                                teste
                            </div>
                        )}
                    </div>
                </div>
                <div className="content">
                    <TabNavigation
                        selected={selectedTab}
                        onChange={setSelectedTab}
                        tabs={tabs} />

                    {selectedTab === "disciplines" && <DisciplinesView />}


                </div>
            </div>
        </>
    )
}
import { useNavigate } from "react-router-dom";
import { ButtonBack } from "../Components/ButtonBack";
import { Header } from "../Components/Header";
import { TabNavigation } from "../Components/TabNavigation";
import { useState } from "react";
import { ButtonIcon } from "../Components/ButtonIcon";
import { HDisciplinesView } from "./HistoryViews/HDisciplinesView";
import {
    useFloating,
    useInteractions,
    useClick,
    useDismiss,
    offset,
    shift,
    flip
} from "@floating-ui/react";
import "./Styles/History.css"
import { HClassesView } from "./HistoryViews/HClassesView";
import { HCompetencesView } from "./HistoryViews/HCompetencesView";
import { HExamsView } from "./HistoryViews/HExamsView";
import { HUsersView } from "./HistoryViews/HUsersView";

export function History() {
    //Variables to navigate and open modals
    const navigate = useNavigate()
    const [selectedTab, setSelectedTab] = useState("disciplines");
    const [open, setOpen] = useState(false)

    const { refs, floatingStyles, context } = useFloating({
        open,
        onOpenChange: setOpen,
        placement: "bottom-end",
        middleware: [
            offset(8),
            flip(),
            shift(),
        ],
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        dismiss,
    ]);


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
                    <div className="infoContainer" ref={refs.setReference}
                        {...getReferenceProps()}>
                        <ButtonIcon
                            size={30}
                            icon={"icon-info"}
                            onClick={() => { }}
                        />

                        {open && (
                            <div
                                className="infoBox"
                                ref={refs.setFloating}
                                style={floatingStyles}
                                {...getFloatingProps()}
                            >
                                Histórico de todas as alterações realizadas no sistema,
                                incluindo registros:
                                <div className="legend">
                                    <div className="legend-row">
                                        <div className="dot green"></div>
                                        <span>Criados</span>
                                    </div>
                                    <div className="legend-row">
                                        <div className="dot blue"></div>
                                        <span>Editados</span>
                                    </div>
                                    <div className="legend-row">
                                        <div className="dot red"></div>
                                        <span>Excluídos</span>
                                    </div>
                                </div>
                                Itens excluídos <strong>permanecerão no histórico por 1 ano </strong> após a exclusão
                                apenas para visualização e <strong>não poderão ser restaurados.</strong>
                            </div>
                        )}
                    </div>
                </div>
                <div className="content">
                    <TabNavigation
                        selected={selectedTab}
                        onChange={setSelectedTab}
                        tabs={tabs} />

                    {selectedTab === "disciplines" && <HDisciplinesView />}
                    {selectedTab === "classes" && <HClassesView />}
                    {selectedTab === "competences" && <HCompetencesView />}
                    {selectedTab === "exams" && <HExamsView />}
                    {selectedTab === "users" && <HUsersView />}


                </div>
            </div>
        </>
    )
}
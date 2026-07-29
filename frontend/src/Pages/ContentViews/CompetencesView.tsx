import "../Styles/Views.css"
import { useNavigate } from "react-router-dom"
import { MoreOpt } from "../../Components/MoreOpt"
import { RowItem } from "../../Components/RowItem"
import { ButtonExclude } from "../../Components/ButtonExclude"
import { ButtonCancel } from "../../Components/ButtonCancel"
import { ButtonClose } from "../../Components/ButtonClose"
import { Button } from "../../Components/Button"
import { useState } from "react"
import { useAuth } from "../../Contexts/AuthContext"

export function CompetencesView({ competences }) {
    //Variables to navigate and open modals
    const navigate = useNavigate();
    const [openCompetenceModal, setOpenCompetenceModal] = useState(false);
    const [editCompetenceModal, setEditCompetenceModal] = useState(false);
    const [excludeCompetenceModal, setExcludeCompetenceModal] = useState(false);

    const [selectedCompetence, setSelectedCompetence] = useState(null);
    //Variables to control the users and its interactions
    const { user } = useAuth();
    const isAdmin = user?.role === "ADMIN";
    const isInstructor = user?.role === "INSTRUCTOR";

    if (!competences.length) {
        return <div>Nenhuma competência encontrada.</div>;
    }

    return (
        <>
            {/* Items shown on the specified tab */}
            <div className="view-page">
                {competences.map((competence) => (
                    <RowItem
                        onClick={() => {
                            setSelectedCompetence(competence);
                            setOpenCompetenceModal(true);
                        }}
                        color="var(--acqua)"
                        size="--medium"
                        button={true}
                        actions={
                            <>
                                {isAdmin || isInstructor &&
                                    <MoreOpt size={22} data={
                                        [
                                            {
                                                name: "Editar competência",
                                                onClick: () => {
                                                    setEditCompetenceModal(true), setSelectedCompetence(competence)
                                                }
                                            },                                           
                                            {
                                                name: "Excluir competência",
                                                onClick: () => {
                                                    setExcludeCompetenceModal(true), setSelectedCompetence(competence)
                                                },
                                                color: "red"
                                            }
                                        ]
                                    } />
                                }
                            </>
                        }>
                        <span>{competence.name}</span>
                    </RowItem>
                ))}
            </div>

            {/* Modal to open the details about a competence
            {openCompetenceModal && (
                <div className="modalOverlay" onClick={() => {
                    setSelectedCompetence(null);
                    setOpenCompetenceModal(true);
                }}>
                    <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                        <div className="titleContainer">
                            <h1>Visualizar competência</h1>
                            <ButtonClose size={40} onClose={() => {
                                setSelectedCompetence(null);
                                setOpenCompetenceModal(true);
                            }}></ButtonClose>
                        </div>
                        <div className="itemsBox">
                            <h3>Competência</h3>
                            <RowItem
                                onClick={() => {}}
                                color="var(--acqua)"
                                size="--medium"
                                button={true}
                                actions={<></>}>

                                <span>{selectedCompetence.name}</span>

                            </RowItem>
                        </div>

                        <div className="itemsBox">
                            <h3>Presente nas aulas</h3>
                            <RowItem
                                onClick={() => {}}
                                color="var(--purple)"
                                size="--medium"
                                button={true}
                                actions={<></>}>

                                <span>Aula 01- Instalando bibliotecas</span>

                            </RowItem>
                        </div>
                        <div></div>
                    </div>
                </div>
            )} */}

            {/* Modal to edit a competence */}
            {editCompetenceModal && (
                <div className="modalOverlay" onClick={() => setEditCompetenceModal(false)}>
                    <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                        <div className="titleContainer">
                            <h1>Editar competência</h1>
                            <ButtonClose size={40} onClose={() => setEditCompetenceModal(false)}></ButtonClose>
                        </div>
                        <div className="textBox">
                            <h2>Nome da competência</h2>
                            <input type="text" />
                        </div>

                        <Button ButtonTitle={"Enviar"} onClose={() => setEditCompetenceModal(false)}></Button>
                    </div>
                </div>
            )}

            {/* Modal to exclude a competence */}
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
    )
}
import "../Styles/Views.css"
import { useNavigate } from "react-router-dom"
import { MoreOpt } from "../../Components/MoreOpt"
import { RowItem } from "../../Components/RowItem"
import { ButtonExclude } from "../../Components/ButtonExclude"
import { ButtonCancel } from "../../Components/ButtonCancel"
import { ButtonClose } from "../../Components/ButtonClose"
import { Button } from "../../Components/Button"
import { useState } from "react"
import { useAuth } from "../../Auth/AuthContext"

export function CompetencesView() {
    //Variables to navigate and open modals
    const navigate = useNavigate();
    const [openCompetenceModal, setOpenCompetenceModal] = useState(false);
    const [editCompetenceModal, setEditCompetenceModal] = useState(false);
    const [excludeCompetenceModal, setExcludeCompetenceModal] = useState(false);

    //Variables to control the users and its interactions
    const { user } = useAuth();
    const isAdmin = user?.role === "ADMIN";
    const isInstructor = user?.role === "INSTRUCTOR";

    //Options for the option buttons
    const options = [
        {
            name: "Editar competência",
            onClick: () =>setEditCompetenceModal(true)
        },
        {
            name: "Excluir competência",
            onClick: () => setExcludeCompetenceModal(true),
            color: "red"
        }
    ]


    return (
        <>
            {/* Items shown on the specified tab */}
            <div className="view-page">
                <RowItem
                    onClick={() => setOpenCompetenceModal(true)}
                    color="var(--acqua)"
                    size="--medium"
                    button={true}
                    actions={
                        <>
                        {isAdmin || isInstructor &&
                            <MoreOpt size={22} data={options} />
                        }
                        </>
                    }>

                    <span>Instalar as bibliotecas necessárias para o projeto</span>
                    

                </RowItem>
            </div>
                
            {/* Modal to open the details about a competence */}
            {openCompetenceModal && (
                    <div className="modalOverlay" onClick={() => setOpenCompetenceModal(false)}>
                    <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                        <div className="titleContainer">
                            <h1>Visualizar competência</h1>
                            <ButtonClose size={40} onClose={() => setOpenCompetenceModal(false)}></ButtonClose>
                        </div>
                        <div className="itemsBox">
                            <h3>Competência</h3>
                            <RowItem
                                onClick={() => navigate("/class")}
                                color="var(--acqua)"
                                size="--medium"
                                button={true}
                                actions={<></>}>

                                <span>Criação de funções Python adequadas</span>
                                

                            </RowItem>
                        </div>

                        <div className="itemsBox">
                            <h3>Presente nas aulas</h3>
                            <RowItem
                                onClick={() => navigate("/class")}
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
            )}
            
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
                            <input type="text"/>
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
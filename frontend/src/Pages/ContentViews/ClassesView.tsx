import "../Styles/Views.css"
import { useNavigate } from "react-router-dom"
import { ButtonIcon } from "../../Components/ButtonIcon"
import { MoreOpt } from "../../Components/MoreOpt"
import { RowItem } from "../../Components/RowItem"
import { ButtonExclude } from "../../Components/ButtonExclude"
import { ButtonCancel } from "../../Components/ButtonCancel"
import { useState } from "react"
import { useAuth } from "../../Auth/AuthContext"

export function ClassesView() {
    //Variables to navigate and open modals
    const navigate = useNavigate();
    const [excludeClassModal, setExcludeClassModal] = useState(false);

    //Variables to control the users and its interactions
    const { user } = useAuth();
    const isAdmin = user?.role === "ADMIN";
    const isInstructor = user?.role === "INSTRUCTOR";
    
    //Options for the option buttons
    const options = [
        {
            name: "Editar aula",
            onClick: () => navigate('/Class')
        },
        {
            name: "Excluir aula",
            onClick: () => setExcludeClassModal(true),
            color: "red"
        }
    ]

    return (
        <>
            {/* Items shown on the specified tab */}
            <div className="view-page">
                <RowItem
                    onClick={() => navigate("/class")}
                    color="var(--purple)"
                    size="--medium"
                    button={true}
                    actions={
                        <>
                            <ButtonIcon icon="icon-download" size={28} onClick={() => navigate("/")} />
                            {isAdmin || isInstructor &&
                                <MoreOpt size={22} data={options} />
                            }
                        </>
                    }>

                    <span>Aula 01 - Instalando bibliotecas</span>
                    

                </RowItem>

            </div>

            {/* Modal to exclude a class */}
            {excludeClassModal && (
                    <div className="modalExcludeOverlay" onClick={() => setExcludeClassModal(false)}>
                    <div className="modalExcludeContainer" onClick={(e) => e.stopPropagation()} >
                    <div className="redString"></div>
                        <p>Deseja excluir a aula?</p>
    
                        <div className="buttonsBox">
                            <ButtonExclude ButtonTitle={"Excluir"} onClose={() => setExcludeClassModal(false)}></ButtonExclude>
                            <br />
                            <ButtonCancel ButtonTitle={"Cancelar"} onClose={() => setExcludeClassModal(false)}></ButtonCancel>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

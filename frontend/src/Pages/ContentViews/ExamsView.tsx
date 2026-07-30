import "../Styles/Views.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { ButtonIcon } from "../../Components/ButtonIcon"
import { MoreOpt } from "../../Components/MoreOpt"
import { RowItem } from "../../Components/RowItem"
import { useAuth } from "../../Contexts/AuthContext"
import { Button } from "../../Components/Button"
import { ButtonClose } from "../../Components/ButtonClose"
import { ButtonCancel } from "../../Components/ButtonCancel"
import { ButtonExclude } from "../../Components/ButtonExclude"
import LessonSelect from "../../Components/LessonSelect"


export function ExamsView() {
    //Variables to navigate and open modals
    const navigate = useNavigate();
    const [editTestModal, setEditTestModal] = useState(false);
    const [excludeTestModal, setExcludeTestModal] = useState(false);

    //Options for the option buttons
    const options = [
        {
            name: "Editar avaliação",
            onClick: () =>setEditTestModal(true)
        },
        {
            name: "Excluir avaliação",
            onClick: () => setExcludeTestModal(true),
            color: "red"
        }
    ]

    //Variables to control the users and its interactions
    const { user } = useAuth();
    const isAdmin = user?.role === "ADMIN";
    const isInstructor = user?.role === "INSTRUCTOR";
    
    return (
        <>
            {/* Items shown on the specified tab */}
            <div className="view-page">
                <RowItem
                    color="var(--green)"
                    size="--medium"
                    actions={
                        <>
                            <ButtonIcon icon="icon-download" size={28} onClick={() => navigate("/")} />
                            {(isAdmin || isInstructor) &&
                                <MoreOpt size={22} data={[]} />
                            }
                        </>
                    }>

                    <span>Avaliação 01</span>
                    

                </RowItem>
            </div>

            {/* Modal to edit the test */}
            {editTestModal && (
                <div className="modalOverlay" onClick={() => setEditTestModal(false)}>
                <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                    {/* Title and close button box */}
                    <div className="titleContainer">
                        <h1>Editar avaliação</h1>
                        <ButtonClose size={40} onClose={() => setEditTestModal(false)}></ButtonClose>
                    </div>
                    {/* Input for test name */}
                    <div className="textBox">
                        <h2>Nome da avaliação</h2>
                        <input type="text"/>
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
                    

                    <Button ButtonTitle={"Enviar"} onClose={() => setEditTestModal(false)}></Button>
                </div>
                </div>
            )}

            {/* Modal to exclude the test */}
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
        </>
    )
}
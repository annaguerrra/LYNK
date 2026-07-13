import "./Styles/Discipline.css"
import { Header } from "../Components/Header"
import { DisciplineComp } from "../Components/Discipline"
import { MoreOpt } from "../Components/MoreOpt"
import { Button } from "../Components/Button"
import { ButtonClose } from "../Components/ButtonClose"

export function Discipline () {
    // const [editModal, setEditModal] = useState(false);
    // const [excludeModal, setExcludeModal] = useState(false);

    // const options = [
    //     {
    //         id: 1,
    //         name: "Editar disciplina",
    //         onClick: () => setEditModal(true)
    //     },
    //     {
    //         name: "Excluir disciplina",
    //         onClick: () => setExcludeModal(true)
    //     },
    // ];

    return (
        <>  
            <Header></Header>
            <div className="page">
                <div className="filtersContainer">
                    <h1 className="titlePage">Bem vindo(a)</h1>
                    <div className="filters">
                        <form>
                            <select id="" name="" className="selectFilter">
                                <option value="TI">TI</option>
                                <option value="Mecânica" selected>Mecânica</option>
                                <option value="Eletrônica">Eletrônica</option>
                                <option value="Administração" selected>Administração</option>
                            </select>
                        </form>
                        <form>
                            <select id="" name="" className="selectFilter">
                                <option value="Inglês">Inglês</option>
                                <option value="Comunicação" selected>Comunicação</option>
                                <option value="Slides">Slides</option>
                                <option value="Organização">Organização</option>
                            </select>
                        </form>
                        {/* <MoreOpt data={options}></MoreOpt> */}
                    </div>
                </div>
                <div className="disciplinesContainer">
                    <DisciplineComp Discipline={"Inglês"} Area={"Administração"}></DisciplineComp>
                    <DisciplineComp Discipline={"Comunicação"} Area={"Administração"}></DisciplineComp>
                    <DisciplineComp Discipline={"Slides"} Area={"Administração"}></DisciplineComp>
                    <DisciplineComp Discipline={"Organização"} Area={"Administração"}></DisciplineComp>
                </div>
            </div>
{/* 
            {editModal && (
                <div className="modalOverlay">
                <div className="modalContainer">
                    <div className="titleContainer">
                        <h1>Editar disciplina</h1>
                        <ButtonClose size={40} onClose={() => setEditModal(false)}></ButtonClose>
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

                    <Button ButtonTitle={"Enviar"} onClose={() => setEditModal(false)}></Button>
                </div>
            </div>
        )}

        {excludeModal && (
                <div className="modalOverlay">
                <div className="modalContainer">
                    <div className="titleContainer">
                        <h1>Excluir disciplina</h1>
                        <ButtonClose size={40} onClose={() => setExcludeModal(false)}></ButtonClose>
                    </div>
                    <p>Deseja excluir a disciplina {Discipline}?</p>

                    <div>
                        <ButtonCancel ButtonTitle={"Excluir"} onClose={() => setExcludeModal(false)}></ButtonCancel>
                        <br />
                        <Button ButtonTitle={"Cancelar"} onClose={() => setExcludeModal(false)}></Button>
                    </div>
                </div>
            </div>
        )} */}
        </>
    )
}
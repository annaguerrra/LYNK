import "./Styles/Discipline.css"
import { Header } from "../Components/Header"
import { DisciplineComp } from "../Components/Discipline"

export function Discipline () {
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
                    </div>
                </div>
                <div className="disciplinesContainer">
                    <DisciplineComp Discipline={"Inglês"} Area={"Administração"}></DisciplineComp>
                    <DisciplineComp Discipline={"Comunicação"} Area={"Administração"}></DisciplineComp>
                    <DisciplineComp Discipline={"Slides"} Area={"Administração"}></DisciplineComp>
                    <DisciplineComp Discipline={"Organização"} Area={"Administração"}></DisciplineComp>
                </div>
            </div>
        </>
    )
}
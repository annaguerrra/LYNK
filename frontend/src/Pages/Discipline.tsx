import "./Styles/Discipline.css"
import { Header } from "../Components/Header"

export function Discipline () {
    return (
        <>  
            <Header></Header>
            <div className="page">
                <div className="filtersContainer">
                    <h1 className="titlePage">Bem vindo(a)</h1>
                    <select name="Área de conhecimento" id="" className="selectFilter"></select>
                </div>
            </div>
        </>
    )
}
import "../App.css"
import "./Styles/ErrorPage.css"
import { Header } from "../Components/Header"

export function ErrorPage() {
    return (
        <>
        <Header></Header>
        <div className="page">
            <img src="./error-500.svg" alt="" className="errorImg"/>
        </div>
        </>
    )
}
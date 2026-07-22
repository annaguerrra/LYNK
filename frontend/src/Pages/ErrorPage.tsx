import "../App.css"
import "./Styles/ErrorPage.css"
import { Header } from "../Components/Header"
import { useLocation } from "react-router-dom";

export function ErrorPage() {
    //Variables to navigate and open modals
    const { state } = useLocation();
    
    return (
        <>
        <Header/>
        
        {/* Whole page */}
        <div className="page">
            <div className="errorContainer">
                {/* Diplay for the error */}
                <h1>{state?.errorText || "Ocorreu um erro :("}</h1>
                <img src="./error-question.png" alt="" className="errorImg"/>
            </div>
        </div>
        </>
    )
}
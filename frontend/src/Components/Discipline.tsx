import { useNavigate } from "react-router-dom"
import "./Styles/discipline.css"

export function Discipline({discipline}) {
    const navigate = useNavigate();

    return (
        <>
            <button className="backgroundButton" onClick={() => navigate(path)}>
                <h1>{ButtonTitle}</h1>
            </button>
        </>
    )
}
import { useNavigate } from "react-router-dom"
import "./Styles/button.css"

export function Button({ButtonTitle, path}) {
    const navigate = useNavigate();

    return (
        <>
            <button className="backgroundButton" onClick={() => navigate(path)}>
                <h1>{ButtonTitle}</h1>
            </button>
        </>
    )
}
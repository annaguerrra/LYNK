import { ButtonBack } from "../Components/ButtonBack";
import { Header } from "../Components/Header";

export function Content() {
    return (
        <>
            <Header/>
            <div className="page">
                <ButtonBack/>               
                <span style={{ fontWeight: "bold", fontSize: "30px" }}>Introdução a Python</span>
            </div>
        </>
    );
}
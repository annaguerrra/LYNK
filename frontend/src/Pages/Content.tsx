import { ButtonBack } from "../Components/ButtonBack";
import { ButtonClose } from "../Components/ButtonClose";
import { Header } from "../Components/Header";
import { TabNavigation } from "../Components/TabNavigation";
import "./Styles/Content.css"

export function Content() {
    return (
        <>
            <Header />
            <div className="page">
                <div className="headerContent">
                    <ButtonBack />
                    <span style={{ fontWeight: "bold", fontSize: "30px" }}>Introdução a Python</span>
                </div>
                <div className="content">
                    <TabNavigation/>
                    <ButtonClose size="50" />
                </div>
            </div>
        </>
    );
}
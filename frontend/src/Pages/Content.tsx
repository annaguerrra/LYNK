import { useState } from "react";
import { ButtonBack } from "../Components/ButtonBack";
import { Header } from "../Components/Header";
import { TabNavigation } from "../Components/TabNavigation";
import "./Styles/Content.css"

export function Content() {
    const [selectedTab, setSelectedTab] = useState("aulas");

    return (
        <>
            <Header />
            <div className="page">
                <div className="headerContent">
                    <ButtonBack />
                    <span style={{ fontWeight: "bold", fontSize: "30px" }}>Introdução a Python</span>
                </div>
                <div className="content">
                    <TabNavigation
                    selected={selectedTab}
                    onChange={setSelectedTab}
      />

      {selectedTab === "aulas" && <p>Aulas</p>}
      {selectedTab === "competencias" && <p>Competencias</p>}
      {selectedTab === "avaliacoes" && <p>Avaliacoes</p>}
                </div>
            </div>
        </>
    );
}
import "./Styles/Content.css"
import { useState } from "react";
import { ButtonBack } from "../Components/ButtonBack";
import { Header } from "../Components/Header";
import { TabNavigation } from "../Components/TabNavigation";
import { ClassesView } from "./ContentViews/ClassesView";
import { CompetencesView } from "./ContentViews/CompetencesView";
import { ExamsView } from "./ContentViews/ExamsView";

export function Content() {
    const [selectedTab, setSelectedTab] = useState("exams");
    const [markdown, setMarkdown] = useState("##Olaaa")

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

      {selectedTab === "classes" && <ClassesView/>}
      {selectedTab === "competences" && <CompetencesView/>}
      {selectedTab === "exams" && <ExamsView/>}

                
                </div>


            </div>
        </>
    );
}
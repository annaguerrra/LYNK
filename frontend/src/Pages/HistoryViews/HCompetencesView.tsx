import { useEffect, useState } from "react";
import { RowItem } from "../../Components/RowItem"
import "../Styles/Views.css"
import { getLogCompetences } from "../../Services/logServices";

export function HCompetencesView() {
    //Variables to control the users and its interactions
    const [competence, setHCompetence] = useState([])
    
    async function loadHCompetence() {
        try {
            const response = await getLogCompetences('Competence');
            setHCompetence(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadHCompetence();
    }, []);

    const actionColors = {
        CREATED: "var(--green)",
        UPDATED: "var(--blue)",
        DELETED: "var(--red)",
    };

    const actionsName = {
        CREATED: "CRIADO",
        UPDATED: "EDITADO",
        DELETED: "DELETADO",
    };

    return (
        <>
            <div className="view-page">
                {competence.map((hcompetence) => (
                <RowItem
                    color={actionColors[hcompetence.action]}
                    size="--medium"
                    userAction={
                        <>
                            <span>{actionsName[hcompetence.action]} por</span>
                            <img
                                src="../../../public/UserDefault/user-purple.png">
                            </img>
                            <span>{hcompetence.username}</span>

                            <span>{hcompetence.updatedAt 
                                ? new Date(hcompetence.updatedAt).toLocaleDateString("pt-BR")
                                : "Sem data"}</span>
                        </>
                    }>
                    <span>{hcompetence.entityName}</span>

                </RowItem>
                ))}

            </div>


        </>
    )
}

import { useEffect, useState } from "react";
import { RowItem } from "../../Components/RowItem"
import "../Styles/Views.css"
import { getLogCompetences } from "../../Services/logServices";

export function HCompetencesView() {
    //Variables to control the users and its interactions
    const [competence, setHCompetence] = useState([])
    
    async function loadHCompetence() {
        try {
            const response = await getLogCompetences('competence');
            setHCompetence(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadHCompetence();
    }, []);

    const actionColors = {
        CREATE: "var(--green)",
        PUT: "var(--blue)",
        DELETE: "var(--red)",
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
                            <img
                                src="../../../public/UserDefault/user-purple.png">
                            </img>

                            <span>{hcompetence.alterUser}</span>
                            <span> | </span>
                            <span>{hcompetence.updatedAt}</span>
                        </>
                    }>

                    <span>{hcompetence.entityName}</span>

                </RowItem>
                ))}

            </div>


        </>
    )
}

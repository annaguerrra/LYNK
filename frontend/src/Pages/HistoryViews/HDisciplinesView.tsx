import { useEffect, useState } from "react";
import { RowItem } from "../../Components/RowItem"
import "../Styles/Views.css"
import { getLogDisciplines } from "../../Services/logServices";

export function HDisciplinesView() {
    //Variables to control the users and its interactions
    const [disciplines, setHDisciplines] = useState([])
    
    async function loadHDisicpline() {
        try {
            const response = await getLogDisciplines('Discipline');
            setHDisciplines(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadHDisicpline();
    }, []);
// 
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
                {disciplines.map((hdiscipline) => (
                <RowItem
                    color={actionColors[hdiscipline.action]}
                    size="--medium"
                    userAction={
                        <>
                            <span>{actionsName[hdiscipline.action]} por</span>
                            <img
                                src="../../../public/UserDefault/user-purple.png">
                            </img>
                            <span>{hdiscipline.username}</span>

                            <span>{hdiscipline.updatedAt 
                                ? new Date(hdiscipline.updatedAt).toLocaleDateString("pt-BR")
                                : "Sem data"}</span>
                        </>
                    }>
                    <span>{hdiscipline.entityName}</span>

                </RowItem>
                ))}
            </div>


        </>
    )
}

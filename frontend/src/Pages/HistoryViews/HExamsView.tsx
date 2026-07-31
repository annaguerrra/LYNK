import { useEffect, useState } from "react";
import { RowItem } from "../../Components/RowItem"
import "../Styles/Views.css"
import { getLogExams } from "../../Services/logServices";

export function HExamsView() {
    //Variables to control the users and its interactions
    const [exam, setHExam] = useState([])
    
    async function loadHExam() {
        try {
            const response = await getLogExams('Exam');
            setHExam(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadHExam();
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
                {exam.map((hexam) => (
                <RowItem
                    color={actionColors[hexam.action]}
                    size="--medium"
                    userAction={
                        <>
                            <span>{actionsName[hexam.action]} por</span>
                            <img
                                src="../../../public/UserDefault/user-purple.png">
                            </img>
                            <span>{hexam.username}</span>

                            <span>{hexam.updatedAt 
                                ? new Date(hexam.updatedAt).toLocaleDateString("pt-BR")
                                : "Sem data"}</span>
                        </>
                    }>
                    <span>{hexam.entityName}</span>

                </RowItem>
                ))}

            </div>


        </>
    )
}

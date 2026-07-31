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

    const actionColors = {
        CREATE: "var(--green)",
        PUT: "var(--blue)",
        DELETE: "var(--red)",
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
                            <img
                                src="../../../public/UserDefault/user-purple.png">
                            </img>

                            <span>{hdiscipline.updatedAt.toLocaleDateString("pt-BR")}</span>
                            <span> | </span>
                            <span>{hdiscipline.updatedAt.toLocaleDateString("pt-BR")}</span>
                        </>
                    }>

                    <span>{hdiscipline.entityName}</span>

                </RowItem>
                ))}
            </div>


        </>
    )
}

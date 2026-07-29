import { useEffect, useState } from "react";
import { RowItem } from "../../Components/RowItem"
import "../Styles/Views.css"
import api from "../../Services/api";

export function HDisciplinesView() {
    //Variables to control the users and its interactions
    const [disciplines, setHDisciplines] = useState([])
    
    async function loadHDisicpline() {
        try {
            const response = await api.get("/logs/competence");
            setHDisciplines(response.data);
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

                            <span>instrutor_0023</span>
                            <span> | </span>
                            <span>{hdiscipline.updatedAt}</span>
                        </>
                    }>

                    <span>{hdiscipline.entityName}</span>

                </RowItem>
                ))}
            </div>


        </>
    )
}

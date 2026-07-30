import { useEffect, useState } from "react";
import { RowItem } from "../../Components/RowItem"
import "../Styles/Views.css"
import { getLogAreas } from "../../Services/logServices";

export function HAreasView() {
    //Variables to control the users and its interactions
    const [hareas, setHArea] = useState([])
    
    async function loadHArea() {
        try {
            const response = await getLogAreas('Area');
            setHArea(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadHArea();
    }, []);

    const actionColors = {
        CREATE: "var(--green)",
        PUT: "var(--blue)",
        DELETE: "var(--red)",
    };

    return (
        <>
            <div className="view-page">
                {hareas.map((harea) => (
                <RowItem
                    color={actionColors[harea.action]}
                    size="--medium"
                    userAction={
                        <>
                            <img
                                src="../../../public/UserDefault/user-purple.png">
                            </img>

                            <span>{harea.updatedAt.toLocaleDateString("pt-BR")}</span>
                            <span> | </span>
                            <span>{harea.updatedAt.toLocaleDateString("pt-BR")}</span>
                        </>
                    }>

                    <span>{harea.entityName}</span>

                </RowItem>
                ))}
            </div>


        </>
    )
}

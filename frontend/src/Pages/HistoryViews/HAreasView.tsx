import { useEffect, useState } from "react";
import { RowItem } from "../../Components/RowItem"
import "../Styles/Views.css"
import { getLogAreas } from "../../Services/logServices";
import { Action } from "@mdxeditor/editor";

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
                {hareas.map((harea) => (
                <RowItem
                    color={actionColors[harea.action]}
                    size="--medium"
                    userAction={
                        <>
                            <span>{actionsName[harea.action]} por</span>
                            <img
                                src="../../../public/UserDefault/user-purple.png">
                            </img>
                            <span>{harea.username}</span>

                            <span>{harea.updatedAt 
                                ? new Date(harea.updatedAt).toLocaleDateString("pt-BR")
                                : "Sem data"}</span>
                        </>
                    }>
                    <span>{harea.entityName}</span>
                    <span></span>
                </RowItem>
                ))}
            </div>


        </>
    )
}

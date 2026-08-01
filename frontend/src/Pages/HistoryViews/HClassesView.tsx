import { RowItem } from "../../Components/RowItem"
import "../Styles/Views.css"
import { useEffect, useState } from "react";
import { getLogClasses } from "../../Services/logServices";

export function HClassesView() {
    //Variables to control the users and its interactions
    const [classes, setHClasses] = useState([])
    
    async function loadHClasses() {
        try {
            const response = await getLogClasses('Class');
            setHClasses(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadHClasses();
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
                {classes.map((hclass) => (
                    <RowItem
                        color={actionColors[hclass.action]}
                        size="--medium"
                        userAction={
                            <>
                                <span>{actionsName[hclass.action]} por</span>
                                <img
                                    src="../../../public/UserDefault/user-purple.png">
                                </img>
                                <span>{hclass.username}</span>

                                <span>{hclass.updatedAt 
                                    ? new Date(hclass.updatedAt).toLocaleDateString("pt-BR")
                                    : "Sem data"}</span>
                            </>
                        }>
                        <span>{hclass.entityName}</span>

                    </RowItem>
                ))}
            </div>


        </>
    )
}

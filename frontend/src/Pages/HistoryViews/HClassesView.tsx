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
        POST: "var(--green)",
        PUT: "var(--blue)",
        DELETE: "var(--red)",
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
                                <img
                                    src="../../../public/UserDefault/user-purple.png">
                                </img>

                                <span>{hclass.alterUser.toLocaleDateString("pt-BR")}</span>
                                <span> | </span>
                                <span>{hclass.updatedAt.toLocaleDateString("pt-BR")}</span>
                            </>
                        }>
                            <span>{hclass.entityName}</span>

                    </RowItem>
                ))}
            </div>


        </>
    )
}

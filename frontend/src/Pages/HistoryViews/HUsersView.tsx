import { useEffect, useState } from "react";
import { RowItem } from "../../Components/RowItem"
import "../Styles/Views.css"
import { getLogUsers } from "../../Services/logServices";
import type { HistoricDTO } from "../../Types/historic";

export function HUsersView() {
    //Variables to control the users and its interactions
    const [husers, setHUser] = useState<HistoricDTO[]>([]);
    
    async function loadHUser() {
        try {
            const response = await getLogUsers('class');
            setHUser(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadHUser();
    }, []);

    const actionColors = {
        CREATE: "var(--green)",
        PUT: "var(--blue)",
        DELETE: "var(--red)",
    };

    return (
        <>
            <div className="view-page">
                {husers.map((huser) => (
                <RowItem
                    key={huser.id}
                    color={actionColors[huser.action]}
                    size="--medium"
                    userAction={
                        <>
                            <img
                                src="../../../public/UserDefault/user-purple.png">
                            </img>

                            <span>{huser.updatedAt.toLocaleDateString("pt-BR")}</span>
                            <span> | </span>
                            <span>{huser.updatedAt.toLocaleDateString("pt-BR")}</span>
                        </>
                    }>

                    <span>{huser.entityName}</span>

                </RowItem>
                ))}
            </div>


        </>
    )
}

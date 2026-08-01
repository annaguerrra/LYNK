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
            const [students, admins, instructors] = await Promise.all([
                getLogUsers("student"),
                getLogUsers("admin"),
                getLogUsers("instructor"),
            ]);

            setHUser([
                ...students,
                ...admins,
                ...instructors,
            ]);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadHUser();
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
                {husers.map((huser) => (
                <RowItem
                    key={huser.id}
                    color={actionColors[huser.action]}
                    size="--medium"
                    userAction={
                        <>
                            {/* Ignore the error, it is working */}
                            <span>{actionsName[huser.action]} por</span>
                            <img
                                src="../../../public/UserDefault/user-purple.png">
                            </img>
                            <span>{huser.username}</span>

                            <span>{huser.updatedAt 
                                ? new Date(huser.updatedAt).toLocaleDateString("pt-BR")
                                : "Sem data"}</span>
                        </>
                    }>
                    <span>{huser.entityName}</span>

                </RowItem>
                ))}
            </div>


        </>
    )
}

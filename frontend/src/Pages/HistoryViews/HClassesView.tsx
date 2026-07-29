import { RowItem } from "../../Components/RowItem"
import "../Styles/Views.css"
import api from "../../Services/api";
import { useEffect, useState } from "react";

export function HClassesView() {
    //Variables to control the users and its interactions
    const [classes, setHClasses] = useState([])
    
    async function loadHClasses() {
        try {
            const response = await api.get("/logs/class");
            setHClasses(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadHClasses();
    }, []);

    const actionColors = {
        CREATE: "var(--green)",
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

                                <span>instrutor_0023</span>
                                <span> | </span>
                                <span>{hclass.updatedAt}</span>
                            </>
                        }>
                            <span>{hclass.entityName}</span>

                    </RowItem>
                ))}
            </div>


        </>
    )
}

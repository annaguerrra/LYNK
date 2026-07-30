import { useEffect, useState } from "react";
import { RowItem } from "../../Components/RowItem"
import "../Styles/Views.css"
import { getLogExams } from "../../Services/logServices";

export function HExamsView() {
    //Variables to control the users and its interactions
    const [exam, setHExam] = useState([])
    
    async function loadHExam() {
        try {
            const response = await getLogExams('exam');
            setHExam(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadHExam();
    }, []);

    const actionColors = {
        CREATE: "var(--green)",
        PUT: "var(--blue)",
        DELETE: "var(--red)",
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
                            <img
                                src="../../../public/UserDefault/user-purple.png">
                            </img>

                            <span>{hexam.updatedAt}</span>
                            <span> | </span>
                            <span>{hexam.updatedAt}</span>
                        </>
                    }>

                    <span>{hexam.entityName}</span>

                </RowItem>
                ))}

            </div>


        </>
    )
}

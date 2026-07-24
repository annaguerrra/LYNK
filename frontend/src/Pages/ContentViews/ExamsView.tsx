import "../Styles/Views.css"
import { useNavigate } from "react-router-dom"
import { ButtonIcon } from "../../Components/ButtonIcon"
import { MoreOpt } from "../../Components/MoreOpt"
import { RowItem } from "../../Components/RowItem"
import { useAuth } from "../../Auth/AuthContext"

export function ExamsView() {
    //Variables to navigate and open modals
    const navigate = useNavigate();

    //Variables to control the users and its interactions
    const { user } = useAuth();
    const isAdmin = user?.role === "ADMIN";
    const isInstructor = user?.role === "INSTRUCTOR";
    
    return (
        <>
            {/* Items shown on the specified tab */}
            <div className="view-page">
                <RowItem
                    color="var(--green)"
                    size="--medium"
                    actions={
                        <>
                            <ButtonIcon icon="icon-download" size={28} onClick={() => navigate("/")} />
                            {isAdmin || isInstructor &&
                                <MoreOpt size={22} data={[]} />
                            }
                        </>
                    }>

                    <span>Avaliação 01</span>
                    

                </RowItem>
            </div>
        </>
    )
}
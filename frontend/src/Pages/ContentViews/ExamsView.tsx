import { useNavigate } from "react-router-dom"
import { ButtonIcon } from "../../Components/ButtonIcon"
import { MoreOpt } from "../../Components/MoreOpt"
import { RowItem } from "../../Components/RowItem"
import "../Styles/Views.css"

export function ExamsView() {
    //Variables to navigate and open modals
    const navigate = useNavigate();

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
                            <MoreOpt size={22} data={[]} />
                        </>
                    }>

                    <span>Avaliação 01</span>
                    

                </RowItem>
            </div>
        </>
    )
}
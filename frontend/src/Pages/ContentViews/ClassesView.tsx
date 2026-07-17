import { useNavigate } from "react-router-dom"
import { ButtonIcon } from "../../Components/ButtonIcon"
import { MoreOpt } from "../../Components/MoreOpt"
import { RowItem } from "../../Components/RowItem"
import "../Styles/Views.css"

export function ClassesView() {
    const navigate = useNavigate();

    return (
        <>
            <div className="view-page">
                <RowItem
                    onClick={() => navigate("/class")}
                    color="var(--purple)"
                    size="--medium"
                    actions={
                        <>
                            <ButtonIcon icon="icon-download" size={28} onClick={() => navigate("/")} />
                            <MoreOpt data={[]} />
                        </>
                    }>

                    <span>Aula 01 - Instalando bibliotecas</span>
                    

                </RowItem>
            </div>
        </>
    )
}
// const [editTest, setEditTest] = useState(false);
// const [editCompetence, setEditCompetence] = useState(false);
// const [editClass, setEditClass] = useState(false);
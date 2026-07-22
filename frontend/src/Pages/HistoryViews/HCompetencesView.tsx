import { RowItem } from "../../Components/RowItem"
import "../Styles/Views.css"

export function HCompetencesView() {

    return (
        <>
            <div className="view-page">
                <RowItem
                    color="var(--purple)"
                    size="--medium"
                    userAction={
                        <>
                            <img
                                src="../../../public/UserDefault/user-purple.png">
                            </img>

                            <span>instrutor_0023</span>
                            <span> | </span>
                            <span>15/08/2026 - 08:38:32</span>
                        </>
                    }>

                    <span>Aula 01 - Instalando bibliotecas</span>

                </RowItem>

                <RowItem
                    color="var(--purple)"
                    size="--medium"
                    userAction={
                        <>
                            <img
                                src="../../../public/UserDefault/user-purple.png">
                            </img>

                            <span>instrutor_0023</span>
                            <span> | </span>
                            <span>15/08/2026 - 08:38:32</span>
                        </>
                    }>

                    <span>Aula 02 - Instalando bibliotecas</span>


                </RowItem>
            </div>


        </>
    )
}

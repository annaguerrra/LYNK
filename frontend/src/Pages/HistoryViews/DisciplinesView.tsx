import { RowItem } from "../../Components/RowItem"
import "../Styles/Views.css"

export function DisciplinesView() {

    return (
        <>
            <div className="view-page">
                <RowItem
                    color="var(--purple)"
                    size="--medium">

                    <span>Aula 01 - Instalando bibliotecas</span>
                    

                </RowItem>

                <RowItem
                    color="var(--purple)"
                    size="--medium">

                    <span>Aula 02 - Instalando bibliotecas</span>
                    

                </RowItem>
            </div>

            
        </>
    )
}

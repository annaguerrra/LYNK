import "../Styles/Views.css"
import { useNavigate } from "react-router-dom"
import { ButtonIcon } from "../../Components/ButtonIcon"
import { MoreOpt } from "../../Components/MoreOpt"
import { RowItem } from "../../Components/RowItem"
import { ButtonExclude } from "../../Components/ButtonExclude"
import { ButtonCancel } from "../../Components/ButtonCancel"
import { useState } from "react"
import { useAuth } from "../../Contexts/AuthContext"
import api from "../../Services/api"

export function ClassesView({ classes }) {
    //Variables to navigate and open modals
    const navigate = useNavigate();
    const [excludeClassModal, setExcludeClassModal] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

    //Variables to control the users and its interactions
    const { user } = useAuth();
    const isAdmin = user?.role === "ADMIN";
    const isInstructor = user?.role === "INSTRUCTOR";

    if (!classes.length) {
        return <div>Nenhuma aula encontrada.</div>;
    }

    async function downloadClass(id) {
        try {
            const { data } = await api.get(`/class/${id}/content/download`, {
                responseType: "blob",
            });

            const url = URL.createObjectURL(data);

            const link = document.createElement("a");
            link.href = url;
            link.download = "Aula";

            link.click();

            URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {/* Items shown on the specified tab */}
            <div className="view-page">
                {classes.map((item) => ( // Using "item" instead of "class" because "class" is a reserved keyword.
                    <RowItem
                        key={item.id}
                        onClick={() => navigate(`/Class/${item.id}`)}
                        color="var(--purple)"
                        size="--medium"
                        button={true}
                        actions={
                            <>
                                <ButtonIcon
                                    icon="icon-download"
                                    size={28}
                                    onClick={() => downloadClass(item.id)}
                                />
                                {(isAdmin || isInstructor) && (
                                    <MoreOpt size={22} data={[
                                        {
                                            name: "Editar aula",
                                            onClick: () => navigate(`/Class/${item.id}`)
                                        },
                                        {
                                            name: "Excluir aula",
                                            onClick: () => { setSelectedClass(item), setExcludeClassModal(true) },
                                            color: "red"
                                        }
                                    ]} />
                                )}
                            </>
                        }
                    >
                        <span>{item.name}</span>
                    </RowItem>
                ))}


            </div>

            {/* Modal to exclude a class */}
            {excludeClassModal && (
                <div className="modalExcludeOverlay" onClick={() => setExcludeClassModal(false)}>
                    <div className="modalExcludeContainer" onClick={(e) => e.stopPropagation()} >
                        <div className="redString"></div>
                        <p>Deseja excluir a aula?</p>

                        <div className="buttonsBox">
                            <ButtonExclude ButtonTitle={"Excluir"} onClose={() => setExcludeClassModal(false)}></ButtonExclude>
                            <br />
                            <ButtonCancel ButtonTitle={"Cancelar"} onClose={() => setExcludeClassModal(false)}></ButtonCancel>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

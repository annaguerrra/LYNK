import "../Styles/Views.css"
import { useNavigate } from "react-router-dom"
import { ButtonIcon } from "../../Components/ButtonIcon"
import { MoreOpt } from "../../Components/MoreOpt"
import { RowItem } from "../../Components/RowItem"
import { ButtonExclude } from "../../Components/ButtonExclude"
import { ButtonCancel } from "../../Components/ButtonCancel"
import { useEffect, useState } from "react"
import { useAuth } from "../../Contexts/AuthContext"
import { getDisciplineClasses } from "../../Services/disciplinesService"
import type { viewClassesDTO } from "../../Types/disciplineDTOS"
import { toast } from "react-toastify"
import { isAxiosError } from "axios"
import api from "../../Services/api"


interface ClassesViewProps {
    disciplineId: number;
}


export function ClassesView({ disciplineId }: ClassesViewProps) {

    const navigate = useNavigate();

    const [excludeClassModal, setExcludeClassModal] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

    const [classes, setClasses] = useState<{id: number, name: string}[]>([]);
    const [loading, setLoading] = useState(true);


    const { user } = useAuth();

    const isAdmin = user?.role === "ADMIN";
    const isInstructor = user?.role === "INSTRUCTOR";


    async function loadClasses() {
        try {
            const response: viewClassesDTO = await getDisciplineClasses(disciplineId);

            setClasses(response.classes);

        } catch (error) {

            if (isAxiosError(error)) {

                if (error.response?.status === 404) {
                    toast.error("404 - Disciplina não encontrada.");
                    return;
                }

                if (error.response?.status === 500) {
                    toast.error("500 - Erro de servidor.");
                    return;
                }
            }

            console.error(error);
            toast.error("Erro ao carregar aulas.");

        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        loadClasses();
    }, [disciplineId]);


    async function downloadClass(id: number) {
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
            toast.error("Erro ao baixar aula.");
        }
    }


    if (loading) {
        return <div>Carregando aulas...</div>;
    }


    if (!classes.length) {
        return <div>Nenhuma aula encontrada.</div>;
    }


    return (
        <>
            <div className="view-page">

                {classes.map((item) => (

                    <RowItem
                        key={item.name}
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
                                    <MoreOpt
                                        size={22}
                                        data={[
                                            {
                                                name: "Editar aula",
                                                onClick: () => navigate(`/Class/${item.id}`)
                                            },
                                            {
                                                name: "Excluir aula",
                                                onClick: () => {
                                                    // setSelectedClass(item);
                                                    setExcludeClassModal(true);
                                                },
                                                color: "red"
                                            }
                                        ]}
                                    />
                                )}
                            </>
                        }
                    >
                        <span>{item.name}</span>

                    </RowItem>

                ))}

            </div>

            {/* Modal */}
            {excludeClassModal && (
                <div
                    className="modalExcludeOverlay"
                    onClick={() => setExcludeClassModal(false)}
                >
                    <div
                        className="modalExcludeContainer"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="redString"></div>

                        <p>Deseja excluir a aula?</p>

                        <div className="buttonsBox">
                            <ButtonExclude
                                ButtonTitle="Excluir"
                                onClose={() => setExcludeClassModal(false)}
                            />

                            <br />

                            <ButtonCancel
                                ButtonTitle="Cancelar"
                                onClose={() => setExcludeClassModal(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
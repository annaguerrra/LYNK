import "../Styles/Views.css"
import { useNavigate } from "react-router-dom"
import { MoreOpt } from "../../Components/MoreOpt"
import { RowItem } from "../../Components/RowItem"
import { ButtonExclude } from "../../Components/ButtonExclude"
import { ButtonCancel } from "../../Components/ButtonCancel"
import { ButtonClose } from "../../Components/ButtonClose"
import { Button } from "../../Components/Button"
import { useEffect, useState } from "react"
import { useAuth } from "../../Contexts/AuthContext"
import { isAxiosError } from "axios"
import { toast } from "react-toastify"
import { getDisciplineCompetences } from "../../Services/disciplinesService"
import type { CompetenceItem } from "../../Types/competence"
import type { DisciplineDTO } from "../../Types/discipline"
import { deleteCompetence, updateCompetence } from "../../Services/competencesService"

interface CompetencesViewProps {
    discipline: DisciplineDTO;
    refresh?: boolean
}


export function CompetencesView({ discipline, refresh }: CompetencesViewProps) {
    //Variables to navigate and open modals
    const navigate = useNavigate();

    const [openCompetenceModal, setOpenCompetenceModal] = useState(false);
    const [editCompetenceModal, setEditCompetenceModal] = useState(false);
    const [excludeCompetenceModal, setExcludeCompetenceModal] = useState(false);

    const [nameEditCompetence, setNameEditCompetence] = useState("")

    const [competences, setCompetences] = useState<CompetenceItem[]>([]);
    const [selectedCompetence, setSelectedCompetence] = useState<CompetenceItem | null>(null);
    const [loading, setLoading] = useState(true);

    //Variables to control the users and its interactions
    const { user } = useAuth();
    const isAdmin = user?.role === "ADMIN";
    const isInstructor = user?.role === "INSTRUCTOR";


    async function loadCompetences() {
        try {
            const response = await getDisciplineCompetences(discipline.id);

            setCompetences(response);

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
            toast.error("Erro ao carregar competências.");

        } finally {
            setLoading(false);
        }
    }

    async function excludeCompetence() {
        if (!selectedCompetence) return;

        try {
            await deleteCompetence(selectedCompetence.id);

            toast.success("Competência excluída com sucesso.");

            setCompetences((prev) =>
                prev.filter((competence) => competence.id !== selectedCompetence.id)
            );

            setSelectedCompetence(null);
            setExcludeCompetenceModal(false);

            await loadCompetences();

        } catch (error) {
            console.error(error);

            if (isAxiosError(error)) {
                switch (error.response?.status) {
                    case 404:
                        toast.error("404 - Competência não encontrada.");
                        return;

                    case 500:
                        toast.error("500 - Erro de servidor.");
                        return;
                }
            }

            toast.error("Erro ao excluir competência.");
        }
    }

    async function editCompetence() {
        if (!selectedCompetence) return;

        try {
            if (!nameEditCompetence) {
                toast.warning("Nome da competência não pode ser nulo!")
                return;
            }

            await updateCompetence(selectedCompetence.id, {
                name: nameEditCompetence
            });

            toast.success("Competência alterada com sucesso.");

            setCompetences((prev) =>
                prev.map((competence) =>
                    competence.id === selectedCompetence.id
                        ? { ...competence, name: competence.name }
                        : competence
                )
            );

            setSelectedCompetence(null);
            setEditCompetenceModal(false);

            await loadCompetences();

        } catch (error) {
            console.error(error);

            if (isAxiosError(error)) {
                switch (error.response?.status) {
                    case 404:
                        toast.error("404 - Competência não encontrada.");
                        return;

                    case 500:
                        toast.error("500 - Erro de servidor.");
                        return;
                }
            }

            toast.error("Erro ao editar competência.");
        }
    }

    useEffect(() => {
        loadCompetences();
    }, [discipline.id, refresh]);

    useEffect(() => {
    }, [competences]);

    if (loading) {
        return <div>Carregando competências...</div>;
    }

    if (!competences.length) {
        return <div>Nenhuma competência encontrada.</div>;
    }


    return (
        <>
            {/* Items shown on the specified tab */}
            <div className="view-page">
                {competences.map((competence) => (
                    <RowItem
                        key={competence.id}
                        // onClick={() => {
                        //     setSelectedCompetence(competence);
                        //     setOpenCompetenceModal(true);
                        // }}
                        color="var(--acqua)"
                        size="--medium"
                        button={false}
                        actions={
                            <>
                                {(isAdmin || isInstructor) &&
                                    <MoreOpt size={22} data={
                                        [
                                            {
                                                name: "Editar competência",
                                                onClick: () => {
                                                    setEditCompetenceModal(true), setSelectedCompetence(competence)
                                                }
                                            },
                                            {
                                                name: "Excluir competência",
                                                onClick: () => {
                                                    setExcludeCompetenceModal(true), setSelectedCompetence(competence)
                                                },
                                                color: "red"
                                            }
                                        ]
                                    } />
                                }
                            </>
                        }>


                        <span>{competence.name}</span>
                        <span style={{ marginRight: "3rem" }}>Contém em {competence.numOfClasses} aulas</span>
                    </RowItem>
                ))}
            </div>

            {/* Modal to open the details about a competence
            {openCompetenceModal && (
                <div className="modalOverlay" onClick={() => {
                    setSelectedCompetence(null);
                    setOpenCompetenceModal(true);
                }}>
                    <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                        <div className="titleContainer">
                            <h1>Visualizar competência</h1>
                            <ButtonClose size={40} onClose={() => {
                                setSelectedCompetence(null);
                                setOpenCompetenceModal(true);
                            }}></ButtonClose>
                        </div>
                        <div className="itemsBox">
                            <h3>Competência</h3>
                            <RowItem
                                onClick={() => {}}
                                color="var(--acqua)"
                                size="--medium"
                                button={true}
                                actions={<></>}>

                                <span>{selectedCompetence.name}</span>

                            </RowItem>
                        </div>

                        <div className="itemsBox">
                            <h3>Presente nas aulas</h3>
                            <RowItem
                                onClick={() => {}}
                                color="var(--purple)"
                                size="--medium"
                                button={true}
                                actions={<></>}>

                                <span>Aula 01- Instalando bibliotecas</span>

                            </RowItem>
                        </div>
                        <div></div>
                    </div>
                </div>
            )} */}

            {/* Modal to edit a competence */}
            {editCompetenceModal && (
                <div className="modalOverlay" onClick={() => setEditCompetenceModal(false)}>
                    <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                        <div className="titleContainer">
                            <h1>Editar competência</h1>
                            <ButtonClose size={40} onClose={() => setEditCompetenceModal(false)}></ButtonClose>
                        </div>
                        <div className="textBox">
                            <h2>Nome da competência</h2>
                            <input type="text" value={nameEditCompetence} onChange={(e) => setNameEditCompetence(e.target.value)} />
                        </div>

                        <Button ButtonTitle={"Enviar"} onClose={() => editCompetence()}></Button>
                    </div>
                </div>
            )}

            {/* Modal to exclude a competence */}
            {excludeCompetenceModal && (
                <div className="modalExcludeOverlay" onClick={() => setExcludeCompetenceModal(false)}>
                    <div className="modalExcludeContainer --lowGap" onClick={(e) => e.stopPropagation()} >
                        <div className="redString --marginBottom"></div>
                        <span>
                            {selectedCompetence.numOfClasses === 0 ? (
                                <>
                                    Ao excluir esta competência, <strong>nenhuma aula</strong> será afetada.
                                </>
                            ) : (
                                <>
                                    Ao excluir esta competência,{" "}
                                    <strong>
                                        {selectedCompetence.numOfClasses}{" "}
                                        {selectedCompetence.numOfClasses === 1 ? "aula" : "aulas"}
                                    </strong>{" "}
                                    {selectedCompetence.numOfClasses === 1 ? "será afetada" : "serão afetadas"}.
                                </>
                            )}
                        </span>
                        <span>Deseja continuar?</span>

                        <div className="buttonsBox --highMargin">
                            <ButtonExclude ButtonTitle={"Excluir"} onClose={() => excludeCompetence()}></ButtonExclude>
                            <br />
                            <ButtonCancel ButtonTitle={"Cancelar"} onClose={() => setExcludeCompetenceModal(false)}></ButtonCancel>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}


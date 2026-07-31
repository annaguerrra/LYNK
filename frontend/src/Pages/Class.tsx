import {
    MDXEditor,
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    tablePlugin,
    linkPlugin,
    codeBlockPlugin,
    codeMirrorPlugin,
    markdownShortcutPlugin,
    toolbarPlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    ListsToggle,
    BlockTypeSelect,
    CreateLink,
    InsertTable,
    InsertCodeBlock,
    ChangeCodeMirrorLanguage,
    ConditionalContents,
    imagePlugin,
    InsertImage,
    thematicBreakPlugin,
    InsertThematicBreak,
    Separator,
} from '@mdxeditor/editor'
import { Header } from "../Components/Header"
import { useEffect, useState } from 'react'
import '@mdxeditor/editor/style.css'
import './Styles/Class.css'
import { ButtonBack } from '../Components/ButtonBack'
import { RowItem } from '../Components/RowItem'
import { ButtonClose } from '../Components/ButtonClose'
import { ButtonIcon } from '../Components/ButtonIcon'
import { useNavigate, useParams } from 'react-router-dom'
import { InputFile } from '../Components/InputFile'
import LessonSelect from '../Components/LessonSelect'
import { useAuth } from '../Contexts/AuthContext'

import type { ClassDTO } from '../Types/class'
import { getClassById, getClassMaterials, updateClass } from '../Services/classesService'
import { toast } from 'react-toastify'
import { isAxiosError } from 'axios'
import type { MaterialDTO } from '../Types/material'
import type { CompetenceDTO } from '../Types/competence'
import { createMaterial } from '../Services/materialsService'
import ActivityIndicator from '../Components/ActivityIndicator'

export function Class() {
    //Variables to navigate and open modals
    const [editMode, setEditMode] = useState(false)
    const [titleClass, setTitleClass] = useState("")

    const navigate = useNavigate();

    //Variables to control the users and its interactions
    const { user } = useAuth();
    const isAdmin = user?.role === "ADMIN";
    const isInstructor = user?.role === "INSTRUCTOR";

    const { class_id } = useParams<{ class_id: string }>();

    const [classItem, setClassItem] = useState<ClassDTO | null>(null);

    const [materials, setMaterials] = useState<MaterialDTO[]>([])
    const [competences, setCompetences] = useState<CompetenceDTO[]>([])

    //Generic content for the markdown
    const [content, setContent] = useState("");
    const [isContentLoaded, setIsContentLoaded] = useState(false);

    //Options to edit the markdown
    const editorPlugins = [
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        imagePlugin(),
        tablePlugin(),
        thematicBreakPlugin(),
        linkPlugin(),
        codeBlockPlugin({
            defaultCodeBlockLanguage: 'csharp'
        }),
        codeMirrorPlugin({
            codeBlockLanguages: {
                javascript: 'JavaScript',
                typescript: 'TypeScript',
                python: 'Python',
                java: 'Java',
                csharp: 'C#',
                cpp: 'C++',
                c: 'C',
                html: 'HTML',
                css: 'CSS',
                json: 'JSON',
                markdown: 'Markdown',
                sql: 'SQL',
                xml: 'XML',
                bash: 'Bash'
            }
        }),
        markdownShortcutPlugin()
    ]

    async function loadMaterials(id: number) {
        try {
            const response = await getClassMaterials(id);
            setMaterials(response)
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response?.status === 404) {
                    toast.error("404 - Materiais não encontrados.");
                    return;
                }
            }
            toast.error(`${error}`);
        }
    }

    async function loadDataClass(id: number) {
        try {
            const response = await getClassById(id);
            setClassItem(response);

        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response?.status === 404) {
                    navigate("/error", {
                        state: { errorText: "404 - Aula não encontrada." }
                    });
                    return;
                }

                if (error.response?.status === 500) {
                    navigate("/error", {
                        state: { errorText: "500 - Error de servidor" }
                    });
                    return;
                }
            }

            navigate("/error");
            console.log(error);
            toast.error(`${error}`);
        }
    }

    useEffect(() => {
        if (!class_id) return;

        const id = Number(class_id);

        loadDataClass(id);
    }, [class_id]);

    useEffect(() => {
        if (!classItem || isContentLoaded) return;

        setTitleClass(classItem.name);
        setContent(classItem.content);
        setIsContentLoaded(true);
        loadMaterials(classItem.id)

    }, [classItem]);


    async function saveClass() {
        if (!classItem) return;

        const data = {
            name: titleClass,
            content: content
        };

        try {
            await updateClass(classItem.id, data);

            toast.success("Aula alterada com sucesso!");
            setEditMode(false);

        } catch (error) {

            console.error(error);
            toast.error("Erro ao salvar alterações.");
        }
    }


    async function handleFileUpload(file: File) {
        if (!classItem) return;

        try {
            await createMaterial({
                name: file.name,
                classId: classItem.id,
                disciplineId: classItem.disciplineId,
                files: [file]
            });

            toast.success("Material enviado.");

            await loadDataClass(classItem.id);
        } catch (error) {
            console.error(error);
            toast.error("Erro ao enviar material.");
        }
    }

    if (!classItem) {
        return (
            <>
                <Header />
                <ActivityIndicator size="large" />
            </>
        );
    }

    return (
        <>
            {/* Header */}
            <Header />

            {/* Whole page */}
            <div className="page-class">
                <div className="headerContent">
                    <ButtonBack onClick={() => navigate(-1)} />
                </div>

                {/* Class content (markdown, files and competences) */}
                <div className='content-class'>

                    {/* Open the markdown editor */}
                    {!editMode && (
                        <div className='markdownBox'>
                            <div className='toolbar view'>
                                <span>{titleClass}</span>
                                {(isAdmin || isInstructor) &&
                                    <button className='buttonEdit' onClick={() => setEditMode(true)}>Editar</button>
                                }
                            </div>
                            <MDXEditor
                                key={content}
                                markdown={content}
                                readOnly
                                plugins={editorPlugins}
                            />

                        </div>

                    )}


                    {editMode &&
                        <div style={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
                            <input className='inputTitle' type='text' value={titleClass} onChange={(e) => setTitleClass(e.target.value)}></input>
                            <div className="markdownEditBox">
                                <MDXEditor className='mdx-editor'
                                    markdown={content}
                                    onChange={setContent}
                                    plugins={[
                                        ...editorPlugins,
                                        toolbarPlugin({
                                            toolbarContents: () => (
                                                <div className="toolbar-group">
                                                    <div className='toolbar'>

                                                        <UndoRedo />
                                                        <BoldItalicUnderlineToggles />
                                                        <CreateLink />
                                                        <Separator />
                                                        <InsertThematicBreak />
                                                        <ListsToggle />
                                                        <InsertImage />
                                                        <InsertTable />

                                                        <ConditionalContents
                                                            options={[
                                                                {
                                                                    when: (editor) =>
                                                                        editor?.editorType === 'codeblock',
                                                                    contents: () => (
                                                                        <ChangeCodeMirrorLanguage />
                                                                    )
                                                                },
                                                                {
                                                                    fallback: () => (
                                                                        <InsertCodeBlock />
                                                                    )
                                                                }
                                                            ]}
                                                        />
                                                        <BlockTypeSelect />

                                                    </div>
                                                    <div className='toolbar-end'>
                                                        <button onClick={() => saveClass()}>Salvar</button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ]}
                                />
                            </div>
                        </div>
                    }
                    {/* Box with files and competences to attach */}
                    <div className="attachmentsBox">
                        <div className='attachmentsContent'>
                            <span className='subtitle'>Anexos</span>
                            <div className='attachments'>
                                {materials.map((material) => (
                                    <>
                                        <RowItem
                                            color='var(--purple)'
                                            actions={
                                                <>
                                                    <ButtonIcon size={20} icon="icon-download" onClick={() => { }} />
                                                    {(isAdmin || isInstructor) && editMode &&
                                                        <ButtonClose size={18} onClose={() => { }} />
                                                    }
                                                </>
                                            }>

                                            <div>{material.name}</div>
                                        </RowItem>
                                    </>
                                ))}


                                {(isAdmin || isInstructor) && editMode &&
                                    <InputFile onFileSelect={handleFileUpload} />
                                }

                            </div>
                            <div className='space'></div>
                            <span className='subtitle'>Competências</span>
                            <div className='attachments' >

                                {/* Component used to search a competence */}
                                {(isAdmin || isInstructor) && editMode &&
                                    <LessonSelect />
                                }
                                <RowItem
                                    type='competence'
                                    actions={
                                        <>
                                            {(isAdmin || isInstructor) && editMode &&
                                                <ButtonClose size={18} onClose={() => { }} />
                                            }
                                        </>
                                    } >
                                    <div>Fazer sei la o que, comepencia de não sei o que mais </div>

                                </RowItem>
                                <RowItem
                                    type='competence'
                                    actions={
                                        <>
                                            {(isAdmin || isInstructor) && editMode &&
                                                <ButtonClose size={18} onClose={() => { }} />
                                            }
                                        </>
                                    } >
                                    <div>Teste de nome para o componente usado para representar uma competencia</div>

                                </RowItem>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


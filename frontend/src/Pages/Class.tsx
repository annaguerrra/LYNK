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
    Separator
} from '@mdxeditor/editor'
import { Header } from "../Components/Header"
import { useState } from 'react'
import '@mdxeditor/editor/style.css'
import './Styles/Class.css'
import { ButtonBack } from '../Components/ButtonBack'
import { RowItem } from '../Components/RowItem'

export function Class() {

    const [editMode, setEditMode] = useState(false)
    const [titleClass, setTitleClass] = useState("Aula 05")

    const [content, setContent] = useState(`## Aula de Programação

Bem-vindo ao editor.

### Exemplo

Selecione um texto e clique em **Negrito**.
`)

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
                csharp: 'C#',
                javascript: 'JavaScript',
                typescript: 'TypeScript',
                html: 'HTML',
                css: 'CSS',
                sql: 'SQL'
            }
        }),
        markdownShortcutPlugin()
    ]

    return (
        <>
            <Header></Header>

            <div className="page-class">

                <div className="headerContent">
                    <ButtonBack />
                </div>

                <div className='content-class'>

                    {!editMode && (
                        <div className='markdownBox'>
                            <div className='toolbar view'>
                                <span>{titleClass}</span>
                                <button className='buttonEdit' onClick={() => setEditMode(true)}>Editar</button>
                            </div>
                            <MDXEditor
                                key={content}
                                markdown={content}
                                readOnly
                                plugins={editorPlugins}
                            />
                        <RowItem size="--medium">
                            <div>
                                <span>Teste: </span>
                                <span>AAA</span>
                            </div>
                            <div>
                                <span>Teste: </span>
                                <span>AAA</span>
                            </div>
                            <div>
                                <span>Teste: </span>
                                <span>AAA</span>
                            </div>
                                
                            
                        </RowItem>
                        </div>
                    )}


                    {editMode &&
                        <div style={{display: 'flex', flexDirection: 'column', width: "100%"}}>
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
                                                        <button onClick={() => setEditMode(false)}>Salvar</button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ]}
                                />
                            </div>
                        </div>
                    }
                    <div className="attachmentsBox">
                        <div className='attachmentsContent'>
                            <span className='subtitle'>Anexos</span>
                            <RowItem >
                                <div>rgdrgr</div>
                            </RowItem>
                            <span className='subtitle'>Competências</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
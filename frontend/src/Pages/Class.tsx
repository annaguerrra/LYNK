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
import { use, useState } from 'react'
import '@mdxeditor/editor/style.css'
import './Styles/Class.css'

export function Class() {

    const [editMode, setEditMode] = useState(true)
    const [content, setContent] = useState(`# Aula de Programação

Bem-vindo ao editor.

## Exemplo

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

                {!editMode && (
                    <div className='markdownBox'>
                        <button onClick={() => setEditMode(true)}>Editar</button>
                        <MDXEditor
                            key={content}
                            markdown={content}
                            readOnly
                            plugins={editorPlugins}
                        />
                    </div>
                )}


                {editMode && <div className="markdownEditBox">
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
                </div>}
                <div className="attachmentsBox">

                </div>
            </div>
        </>
    )
}
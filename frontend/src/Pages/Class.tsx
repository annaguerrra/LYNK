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

export function Class() {

    const [content, setContent] = useState(`# Aula de Programação

Bem-vindo ao editor.

## Exemplo

Selecione um texto e clique em **Negrito**.
`)

    return (
        <>
            <Header></Header>

            <div className="page-class">
                <div className="markdownEditBox">
                    <MDXEditor className='mdx-editor'
                        markdown={content}
                        onChange={setContent}
                        plugins={[
                            headingsPlugin(),
                            listsPlugin(),
                            quotePlugin(),
                            tablePlugin(),
                            linkPlugin(),
                            imagePlugin(),
                            thematicBreakPlugin(),
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
                            markdownShortcutPlugin(),
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
                                            <button>Salvar</button>
                                        </div>
                                    </div>
                                )
                            })
                        ]}
                    />
                </div>
                <div className="attachmentsBox">

                </div>
            </div>
        </>
    )
}
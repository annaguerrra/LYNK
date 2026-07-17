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
import { ButtonClose } from '../Components/ButtonClose'
import { ButtonIcon } from '../Components/ButtonIcon'
import { useNavigate } from 'react-router-dom'

export function Class() {

    const [editMode, setEditMode] = useState(false)
    const [titleClass, setTitleClass] = useState("Aula 05")
    const navigate = useNavigate();

    const [content, setContent] = useState(`# Introdução ao Python

Python é uma linguagem de programação simples, poderosa e muito utilizada.

## Primeiro programa

O comando mais básico em Python é o \`print()\`, usado para mostrar informações na tela.

\`\`\`python
print("Olá, mundo!")
\`\`\`

Resultado:

\`\`\`
Olá, mundo!
\`\`\`

## Variáveis

Variáveis armazenam valores dentro do programa.

\`\`\`python
nome = "Maria"
idade = 20

print(nome)
print(idade)
\`\`\`

## Exercício

Crie um programa que:

- Peça o nome do usuário;
- Guarde o nome em uma variável;
- Mostre uma mensagem de boas-vindas.

Exemplo:

\`\`\`
Digite seu nome: Ana

Olá, Ana!
\`\`\`
`);



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
                    <ButtonBack onClick={() => navigate("/content")} />
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
                            <div className='attachments'>
                                <RowItem
                                    type='class'
                                    actions={
                                        <>
                                            <ButtonIcon size={20} icon="icon-download" onClick={() => { }} />
                                            <ButtonClose size={18} onClose={() => { }} />
                                        </>
                                    }>

                                    <div>Material_aaa00 drgrdgrd rdg rdg rdg rdgrdg dr gdr grdgr  dgdrgdrg r</div>
                                </RowItem>
                            </div>
                            <span className='subtitle'>Competências</span>
                            <div className='attachments'>
                                <RowItem type='competence' >
                                    <div>Fazer sei la o que, comepencia de não sei o que mais </div>
                                    <div className='buttonsRow'>
                                        <ButtonClose size={18} onClose={() => { }} />
                                    </div>
                                </RowItem>
                                <RowItem type='competence' >
                                    <div>Teste de nome para o componente usado para representar uma competencia</div>
                                    <div className='buttonsRow'>
                                        <ButtonClose size={18} onClose={() => { }} />
                                    </div>
                                </RowItem>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
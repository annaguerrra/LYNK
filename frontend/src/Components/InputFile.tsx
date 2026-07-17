import "./Styles/inputFile.css"

export function InputFile() {
    return (
        <>
            <label className="fileButton">
                Escolher arquivo
                <input type="file" />
            </label>
        </>
    )
}
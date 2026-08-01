import "./Styles/inputFile.css"

interface InputFileProps {
    onFileSelect?: (file: File) => void;
}

export function InputFile({ onFileSelect }: InputFileProps) {
    return (
        <>
            <label className="fileButton">
                Escolher arquivo
                <input
                    type="file"
                    onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (file) {
                            onFileSelect?.(file);
                        }
                    }}
                />
            </label>
        </>
    )
}

import { useMemo, useState } from "react";
import "./Styles/LessonSelect.css";

interface Lesson {
    id: number;
    name: string;
}

export default function LessonSelect() {
    const lessons: Lesson[] = [
        { id: 1, name: "Matemática - Aula 01 rgdgrdg drtdr d d rgdr gdr g" },
        { id: 2, name: "Matemática - Aula 02 drgr grg rdgrg g" },
        { id: 3, name: "Física - Aula 05" },
        { id: 4, name: "História - Aula 03" },
        { id: 5, name: "Química - Aula 01" },
        { id: 6, name: "Matemática - Aula 02" },
        { id: 7, name: "Física - Aula 05" },
        { id: 8, name: "História - Aula 03" },
        { id: 9, name: "Química - Aula 01" },
    ];

    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);

    //Variable used to search for the competences
    const filteredLessons = useMemo(() => {
        return lessons.filter((lesson) =>
            lesson.name.toLowerCase().includes(query.toLowerCase())
        );
    }, [query]);

    return (
        <div className="lessonSelect">
            {/* Input used to search for the necessary info */}
            <div className="inputContainer">
                <input
                    type="text"
                    placeholder="Buscar"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setOpen(true)}
                    onBlur={() => {
                        setTimeout(() => setOpen(false), 150);
                    }}
                />

                <button
                    type="button"
                    className="actionButton"
                >
                    +
                </button>
            </div>
                
            {/* Modal to show the research results */}
            {open && (
                <div className="dropdown">
                    {filteredLessons.length === 0 ? (
                        <div className="empty">
                            Não encontrado
                        </div>
                    ) : (
                        filteredLessons.map((lesson) => (
                            <button
                                key={lesson.id}
                                type="button"
                                onMouseDown={() => {
                                    setQuery(lesson.name);
                                    setOpen(false);
                                }}
                            >
                                {lesson.name}
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

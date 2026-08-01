import { useMemo, useState } from "react";
import "./Styles/LessonSelect.css";

export interface Lesson {
    id: number;
    name: string;
}

interface LessonSelectProps {
    lessons: Lesson[];
    onAdd: (lesson: Lesson) => void;
}

export default function LessonSelect({
    lessons,
    onAdd,
}: LessonSelectProps) {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

    const filteredLessons = useMemo(() => {
        return lessons.filter((lesson) =>
            lesson.name.toLowerCase().includes(query.toLowerCase())
        );
    }, [lessons, query]);

    function handleAdd() {
        if (!selectedLesson) return;

        onAdd(selectedLesson);

        setSelectedLesson(null);
        setQuery("");
        setOpen(false);
    }

    return (
        <div className="lessonSelect">
            <div className="inputContainer">
                <input
                    type="text"
                    placeholder="Buscar"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setSelectedLesson(null);
                    }}
                    onFocus={() => setOpen(true)}
                    onBlur={() => setTimeout(() => setOpen(false), 150)}
                />

                <button
                    type="button"
                    className="actionButton"
                    onClick={handleAdd}
                    disabled={!selectedLesson}
                >
                    +
                </button>
            </div>

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
                                    setSelectedLesson(lesson);
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
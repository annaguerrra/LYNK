import "./Styles/tabNavigation.css"

type TabNavigationProps = {
    selected: string;
    onChange: (tab: string) => void;
};

export function TabNavigation({
    selected,
    onChange,
}: TabNavigationProps) {
    return (
        <div className="a-tab-navigation__wrapper">
            <ul className="a-tab-navigation">
                <li className="a-tab-navigation__item">
                    <button
                        className={`a-tab-navigation__tab ${selected === "classes" ? "-selected" : ""
                            }`}
                        onClick={() => onChange("classes")}
                    >
                        <span className="a-tab-navigation__tab-content">
                            <span className="a-tab-navigation__label">Aulas</span>
                        </span>
                    </button>
                </li>

                <li className="a-tab-navigation__item">
                    <button
                        className={`a-tab-navigation__tab ${selected === "competences" ? "-selected" : ""
                            }`}
                        onClick={() => onChange("competences")}
                    >
                        <span className="a-tab-navigation__tab-content">
                            <span className="a-tab-navigation__label">Competências</span>
                        </span>
                    </button>
                </li>

                <li className="a-tab-navigation__item">
                    <button
                        className={`a-tab-navigation__tab ${selected === "exams" ? "-selected" : ""
                            }`}
                        onClick={() => onChange("exams")}
                    >
                        <span className="a-tab-navigation__tab-content">
                            <span className="a-tab-navigation__label">Avaliações</span>
                        </span>
                    </button>
                </li>

            </ul>
        </div>
    );
}
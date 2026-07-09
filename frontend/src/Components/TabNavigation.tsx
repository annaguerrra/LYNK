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
                        className={`a-tab-navigation__tab ${selected === "aulas" ? "-selected" : ""
                            }`}
                        onClick={() => onChange("aulas")}
                    >
                        <span className="a-tab-navigation__tab-content">
                            <span className="a-tab-navigation__label">Aulas</span>
                        </span>
                    </button>
                </li>

                <li className="a-tab-navigation__item">
                    <button
                        className={`a-tab-navigation__tab ${selected === "competencias" ? "-selected" : ""
                            }`}
                        onClick={() => onChange("competencias")}
                    >
                        <span className="a-tab-navigation__tab-content">
                            <span className="a-tab-navigation__label">Competências</span>
                        </span>
                    </button>
                </li>

                <li className="a-tab-navigation__item">
                    <button
                        className={`a-tab-navigation__tab ${selected === "avaliacoes" ? "-selected" : ""
                            }`}
                        onClick={() => onChange("avaliacoes")}
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
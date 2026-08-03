import "./Styles/tabNavigation.css";

type Tab = {
    id: string;
    label: string;
    allowedRoles?: string[];
};

type TabNavigationProps = {
    tabs: Tab[];
    selected: string;
    onChange: (tab: string) => void;
    userRole: string;
};

// Component to show all the tabs
export function TabNavigation({
    tabs,
    selected,
    onChange,
    userRole,
}: TabNavigationProps) {
    const visibleTabs = tabs.filter(
        (tab) =>
            !tab.allowedRoles ||
            tab.allowedRoles.includes(userRole)
    );

    return (
        <div className="a-tab-navigation__wrapper">
            {/* List with all the tab options */}
            <ul className="a-tab-navigation">
                {visibleTabs.map((tab) => (
                    <li
                        key={tab.id}
                        className="a-tab-navigation__item"
                    >
                        {/* Button to select a specific tab */}
                        <button
                            className={`a-tab-navigation__tab ${
                                selected === tab.id ? "-selected" : ""
                            }`}
                            onClick={() => onChange(tab.id)}
                        >
                            <span className="a-tab-navigation__tab-content">
                                <span className="a-tab-navigation__label">
                                    {tab.label}
                                </span>
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
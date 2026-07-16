import "./Styles/buttonIcon.css"

interface ButtonIconProps {
    size: number
    icon: string
    onClick: () => void
}

export function ButtonIcon({ size, icon, onClick }: ButtonIconProps) {
    return (
        <>
            <button className="btnIcon" onClick={() => onClick()}>
                <i className={`icon ${icon}`} style={{ fontSize: `${size}px` }}></i>
            </button>
        </>
    )
}

 
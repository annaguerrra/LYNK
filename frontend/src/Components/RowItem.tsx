import './Styles/RowItem.css'

export function RowItem({ type = '', color = '', size = '', children }) {
    return (
        <div className='rowContainer'>
            <div className={`tagRow ${type}`} style={{ backgroundColor: color }}></div>
            <div className={`contentRow ${size}`}>
                {children}
            </div>
        </div>
    )
}
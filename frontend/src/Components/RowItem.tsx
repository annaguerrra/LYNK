import './Styles/RowItem.css'

export function RowItem({ size = '', children }) {
    return (
        <div className='rowContainer'>
            <div className='tagRow'></div>
            <div className={`contentRow ${size}`}>
                {children}
            </div>
            <div className='buttonsRow'></div>
        </div>
    )
}
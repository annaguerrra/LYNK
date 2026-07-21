import './Styles/RowItem.css';
import React from 'react';

//Interface with everything that a item could have
interface RowItemProps {
  type?: string;
  color?: string;
  size?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  onClick?: () => void;
  button?: boolean;
}

export function RowItem({
  type = '',
  color = '',
  size = '',
  children,
  actions = <></>,
  onClick = () => {},
  button = false,
}: RowItemProps) {
  const Component = button ? 'button' : 'div';

  return (
    <div className="rowContainer">
      {/* Setting the item color to the received color */}
      <div
        className={`tagRow ${type}`}
        style={{ backgroundColor: color }}
      />

      <Component
        type={button ? 'button' : undefined}
        className={`contentRow ${size}`}
        onClick={button ? onClick : undefined}
      >
        {children}
      </Component>

      {actions && (
        <div className="buttonsRow">
          {actions}
        </div>
      )}
    </div>
  );
}

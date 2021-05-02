import React from 'react';
import './Button.css';

const STYLE = [
    'btn--primary',
    'btn--outline'
];

const SIZES = [
    'btn--medium',
    'btn--medium--free',
    'btn--large',
    'btn--mobile',
    'btn--wide'
];

const COLOR = [
    'primary',
    'blue',
    'red',
    'gray',
];

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize,
    buttonColor
}) => {
    const checkButtonStyle = STYLE.includes(buttonStyle) ? buttonStyle : STYLE[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
    const checkButtonColor = COLOR.includes(buttonColor) ? buttonColor : COLOR[0];
    return (
        <button className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkButtonColor}`} onClick={onClick} type={type}>
            {children}
        </button>
    )
}

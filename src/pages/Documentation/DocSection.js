import React from 'react';
import './Documentation.css';

function DocSection({
    titleSection, stepDescription
}) {
    return (
        <>
            <div className='guide-section'>
                <h1 className='section-title color-black'>{titleSection}</h1>
                <div className='section-body' style={{ whiteSpace: 'pre-wrap' }}>
                    <h4> {stepDescription} </h4>
                </div>
            </div>
        </>
    )
}

export default DocSection;



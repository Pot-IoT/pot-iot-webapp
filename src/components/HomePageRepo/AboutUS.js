import React from 'react';
import './AboutUS.css';

function AboutUS() {
    return (
        <div className='vision-section' id='vison-section'>
            <h1 className='vision-title'>About Us</h1>
            <h2 className='vision-description' style={{ whiteSpace: 'pre-wrap' }}>
                {
                    'Hi there! Glad you found us, good job! \n' +
                    '\n' +
                    'Ok. so who we are? \n' +
                    '  - We are a gourp of people who fasinated to solve the problem for the world. We share common interests and mission —— bring IoT to everybody. Providing a better and eaiser way for people who want to work with IoT, lower the threshold for accessing data.\n' +
                    '  - We are an engineer driven organization with all members are engieneers from large companies around the world. We have a wealth of engineering experience, and are committed to dedicating our time to make the world a better place through technology. \n' +
                    '\n' +
                    'What we want: \n' +
                    '  - Long term continuous iteration to improve products + 24h custome support :) \n' +
                    '  - Allow everybody use or create IoT application even if they do not have relevant knowledge. \n' +
                    '\n' +
                    'What we have in the roadmap (updating...): \n' +
                    '  - Fully PSK support \n' +
                    '  - Enable HTTPS \n' +
                    '  - Remote device management & Firmware upgrade \n' +
                    '  - Parsing & cleaning data \n' +
                    '\n' +
                    '... More to come, stay tuned!'
                }
            </h2>
        </div>
    )
}

export default AboutUS
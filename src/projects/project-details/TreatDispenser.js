import imageSRC from '../../images/treat-dispenser.png'
import { HashLink as Link } from 'react-router-hash-link';
import React from 'react';

const TreatDispenser = {
    id: 'treat-dispenser',
    name: 'Treat Dispenser',
    url: 'https://treat.mdrichardson.net',
    github: 'https://github.com/mdrichardson/treat-dispenser',
    image: imageSRC,
    tools: [
        'Angular 6',
        'Node.js',
        'MongoDB',
        'C/C++',
        'TypeScript'
    ],
    short_desc: 'PWA with user authorization that controls a self-built and self-programmed dog treat dispenser',
    long_desc: 'This is a progressive web app used to control a dog treat dispenser made with a Particle Photon ' +
                '(similar to Arduino). The treat dispenser can be triggered to dispense via a web app, ' +
                'custom time intervals, and/or a customizable feeding schedule.',
    bullets: [
        'Full-stack (MEAN) application with user authentication',
        'Works in Chrome, Edge, and IE',
        'Treat dispenser hardware was programmed by me, using C/C++',
        <span>If you'd like to test it, <Link to="/#Contact">contact me</Link> for the login details</span>
    ]
}

export default TreatDispenser;
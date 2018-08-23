import imageSRC from '../../images/treat-dispenser.png'

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
                '(similar to Arduino). The treat dispenser dispenses treats based off of input from the web app, ' +
                'time intervals, and/or customizable feeding schedule.',
    bullets: [
        'Full-stack (MEAN) application with user authentication',
        'Works in Chrome, Edge, and IE (despite using CSS Grid and a lot of things IE hates)',
        'Treat dispenser hardware was programmed by me, using C/C++',
        'If you\'d like to test it, <Link to="/#Contact">contact me</Link> for the login details.'
    ]
}

export default TreatDispenser;
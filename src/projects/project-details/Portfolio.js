import imageSRC from '../../images/portfolio.png'
import React from 'react';
import lighthouse from '../../images/lighthouse.png'

const Portfolio = {
    id: 'portfolio',
    name: 'Portfolio Site',
    url: 'https://www.mdrichardson.net',
    github: 'https://github.com/mdrichardson/portfolio',
    image: imageSRC,
    tools: [
        'React',
        'JavaScript',
        'Node.js',
        'Sass',
        'AWS',
    ],
    short_desc: 'You\'re here! Building this in React is definitely overkill, but I wanted the practice.',
    long_desc: 'Like many web developers, I built this site to showcase my previous work and let you know ' +
                'a little bit more about me. I know it\'s overkill to build this in React, since it\'s mostly ' +
                'a static site but, I hadn\'t used React before and wanted to learn it. It was a surprisingly easy transition from Angular.',
    bullets: [
        'Uses Node.js, Express, and NodeMailer for Contact form',
        'Works in Chrome, Edge, IE, and mobile',
        'Hosted on an AWS EC2 instance running Ubuntu',
        // Spans have to be used in order to use HTML within the object
        <span>100s on all Lighthouse Audits<br />
        <img src={ lighthouse } id="lighthouse-img" alt="Lighthouse scores"/></span>,
        'Did you find any easter eggs?'
    ]
}

export default Portfolio;
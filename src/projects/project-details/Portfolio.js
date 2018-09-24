import imageSRC from '../../images/portfolio.png'
import React from 'react';
import lighthouse from '../../images/lighthouse.png'

const Portfolio = {
    id: 'portfolio',
    name: 'Portfolio Site',
    url: 'https://www.mdrichardson.net',
    github: 'https://github.com/mdrichardson/portfolio-blog',
    image: imageSRC,
    tools: [
        'React',
        'JavaScript',
        'Sass',
        'AWS',
        'Linux'
    ],
    short_desc: 'You\'re here! Building this in React is definitely overkill, but I wanted the practice.',
    long_desc: 'Like many aspiring developers, I built this site to showcase my previous work and let you know ' +
                'a little bit more about me. It\'s definitely overkill to build this in React, since it\'s mostly ' +
                'a static site. However, this sets me up well for when I add a blog.',
    bullets: [
        'The properties for the "Michael Richardson" object at the top, as well as all of these projects, are dynamically loaded',
        'Works in Chrome, Edge, IE, and mobile',
        'Hosted on an AWS EC2 instance running Ubuntu',
        <span>100s on all Lighthouse Audits<br />
        <img src={ lighthouse } max-width="400px" style={{ paddingTop: "0.25em" }} alt="Lighthouse scores"/></span>,
        'Did you find any easter eggs?'
    ]
}

export default Portfolio;
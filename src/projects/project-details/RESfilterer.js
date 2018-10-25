import React from 'react';
import imageSRC from '../../images/res-filterer.png'

const RESfilterer = {
  id: 'res-filterer',
  name: 'RES Domain Filterer',
  url: null,
  github: 'https://github.com/mdrichardson/RES-Domain-Filterer',
  image: imageSRC,
  tools: [
    'Python',
    'RES'
  ],
  short_desc: <span>Scrapes domains from selected pages of <a href="mediabiasfactcheck.com" target="_blank" rel="noopener noreferrer">MediaBiasFactCheck </a> 
                        and adds them to Reddit Enhancement Suite's Domain Filters</span>,
  long_desc: <span>This is a command-line tool written in Python that scrapes domains from selected pages of 
    <a href="mediabiasfactcheck.com" target="_blank" rel="noopener noreferrer"> MediaBiasFactCheck</a> and adds them to Reddit Enhancement Suite's Domain Filters. 
                For example, I used this to hide the most biased and untrustworthy news sources (about 1200 unique domains) so that 
                I no longer see them when browsing Reddit.</span>,
  bullets: [
    'Supports all bias categories from MediaBiasFactCheck',
    'Users can select multiple categories and filter them all at once',
    'File loading and saving is done using tKinter',
    'Web scraping is done with requests'
  ]
}

export default RESfilterer;
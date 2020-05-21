import imageSRC from '../../images/beer-recommender.png'
import React from 'react';

const BeerRecommender = {
  id: 'beer-recommender',
  name: 'beerRecommenderBot',
  url: null,
  github: 'https://github.com/mdrichardson/beerRecommenderBot/',
  image: imageSRC,
  tools: [
    'Node.js',
    'TypeScript',
    'Azure',
  ],
  short_desc: 'Intelligent web chat bot that provides beer recommendations. Built in under days.',
  long_desc: 'This is an intelligent web chat bot built using the Microsoft Bot Framework, Node SDK v4. It gets user beer flavor preferences and ' +
              'recommends the matching beer style, and then provides a recommendation for a new beer to try and displays where they can purchase it.',
  bullets: [
    'Uses a machine learning-based service for natural language recognition',
    'Implements multi-turn conversations and user interrupts for “help” and “cancel”',
    'Uses custom LUIS choice prompt class that first looks for LUIS intents and if not found, prevents a list of valid options',
    'Built in under 3 days'
  ]
}

export default BeerRecommender;
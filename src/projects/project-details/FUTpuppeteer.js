import imageSRC from '../../images/futpuppeteer.png'

const FUTpuppeteer = {
  id: 'futpuppeteer',
  name: 'FUTpuppeteer',
  url: null,
  github: 'https://github.com/mdrichardson/futpuppeteer',
  image: imageSRC,
  tools: [
    'Python',
    'Selenium',
    'SQLite',
    'Postgres'
  ],
  short_desc: 'Auto-clicking bot used to buy and sell players on EA’s FIFA 18 Ultimate Team web app',
  long_desc: 'This is an auto-clicking bot that utilizes Selenium to buy and sell players on EA Sports ' +
                'FIFA 18 Ultimate Team web app. It it my largest project at over 8,000 lines of Python code.',
  bullets: [
    'Numerous and extensive strategies and customization options',
    'Able to run for days without user interaction, sniping and bidding on players',
    'Uses randomized delays and off-center clicking to mimic human interactions and avoid detection',
    'Has IMAP support, so users can auto-login with 2-factor email authentication'
  ]
}

export default FUTpuppeteer;
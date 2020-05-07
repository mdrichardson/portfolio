// Styling for fancy messages in dev console
const logFName = [
  'background: #F71735',
  'color: white',
  'font-size: 20px'
].join(';');

const logLName = [
  'background: #FCAB10',
  'color: white',
  'font-size: 20px'
].join(';');

const logHeader = [
  'color: black',
  'font-size: 16px',
  'font-weight: bold'
].join(';');

const logMessage = [
  'color: black',
  'font-size: 14px'
].join(';');


// Fancy welcome message in dev console
const fancyLog = () => {
  console.log('%c  Michael %c Richardson  ', logFName, logLName);
  console.log('%cWelcome to my portfolio!', logHeader);
  console.log('%cIf you\'re reading this, you\'re either trying to break my page or see ' +
                'if I\'m a half decent developer. If you think I am, contact me:', logMessage);
  console.log('%chttps://www.mdrichardson.net/#Contact', logMessage);
}

export default fancyLog;
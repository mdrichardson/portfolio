import fancyLog from './fancyLog';
import ReactGA from 'react-ga';

const errorStyle = [
  'color: white',
  'background: red',
  'font-size: 14px'
].join(';'); 

const dynamicClassesToHide = [
  'skillsItem',
  'project-container',
  'submit',
  'looking-for',
  'navItem',
  'bracket'
]

var dynamicElements = []

var boolElements = []

// This is intentionally a template string. Only works this way
const cssChange = `
    #ui-block {
        z-index: 5;
        margin-top: -40vh;
        display: block;
    }
    #ui-block::before {
        content: 'Oh boy. Here we go...';
        font-size: 2em;
        font-weight: bold;
    }
    #ui-block {
        font-size: 1.5em;
        text-align: center;
        align-self: center;
        justify-self: center;
        height: 30vh;
        width: 80vw;
        background: rgba(255, 255, 255, 0.5);
        color: white;
    }
    body {
        background: black;
    }
    #bracket::before {
        height: 40px;
        min-width: 1px;
    }
    #hero-name p {
        font-size: 7vw;
    }
`

class Easter_Egg {


    // Mess with UI based off of the easterEgg values passed through props
    // Cases: console, dynamic_items, ui, scroll
    easterEggFalse = (eggs) => {
      // Display notification that user broke something, so they can return it to normal and don't miss anything
      let brokenNotification = document.getElementById('broken-notification');
      brokenNotification.style.display = 'block';
      // Now handle the eggs
      eggs.forEach(egg => {
        // Track eggs in GA
        ReactGA.event({
          category: 'EasterEggs',
          action: egg
        });
        switch(egg) {
        case 'console':
          // Make a bunch of weird messages in the console
          console.log('%cOH NO. LOOK WHAT YOU DID', errorStyle)
          console.warn('Things aren\'t looking so good')
          console.error('I swear I\'m a full-stack developer!!')
          break;
        case 'dynamic_items':
          // Hide items on the page by class in dynamicElements
          // Much easier to use opacity vs. display: none or something
          this.generateDynamicElements();
          dynamicElements.forEach(elem => {
            elem.style.opacity = '0';
          })
          break;
        case 'ui':
          // Mess up the Hero UI
          this.changeUI();
          break;
        case 'scroll':
          // Break scrolling
          document.body.style.height = '100%';
          document.body.style.overflow = 'hidden';
          break;
        default:
          return
        }
      })
    }

    // Revert UI back to normal for the value that changed back
    easterEggTrue = (eggs) => {
      // First handle the eggs
      eggs.forEach(egg => {
        switch(egg) {
        case 'console':
          // Clear console
          console.clear();
          // Put welcome message back
          fancyLog();
          break;
        case 'dynamic_items':
          // Make items visible on the page by class in dynamicElements
          this.generateDynamicElements();
          dynamicElements.forEach(elem => {
            elem.style.opacity = '1';
          })
          break;
        case 'ui':
          // Fix the Hero UI
          this.changeUI('reverse');
          break;
        case 'scroll':
          // Enable scrolling
          document.body.style.height = 'auto';
          document.body.style.overflow = 'visible';
          break;
        default:
          return
        }
      })
      // Now check if all values are true so we can hide notification
      let allTrue = this.checkIfTrue();
      if (allTrue) {
        // Hide notification that user broke something, so they can return it to normal and don't miss anything
        let brokenNotification = document.getElementById('broken-notification');
        brokenNotification.style.display = 'none';
      }       
    }

    // Generate the list of dynamicElements if it hasn't been, already
    generateDynamicElements = () => {
      if (dynamicElements.length === 0) {
        dynamicClassesToHide.forEach(className => {
          // ...ByClassName returns an HTML collection, so we need to use an iterator to loop through it
          let elems = document.getElementsByClassName(className);
          for (var i = 0; i < elems.length; i++) {
            dynamicElements.push(elems[i])
          }
        })
      }
    }

    // Generate the list of boolElements if it hasn't been, already
    generateBoolElements = () => {
      if (boolElements.length === 0) {
        let elems = document.getElementsByClassName('bool');
        for (var i = 0; i < elems.length; i++) {
          boolElements.push(elems[i])
        }
      }
    }

    // Check if all of our Hero properties are true
    checkIfTrue = () => {
      this.generateBoolElements();
      let allTrue = true;
      boolElements.forEach(elem => {
        if (elem.value === 'false') {
          allTrue = false;
        }
      })
      return allTrue;
    }

    // Make the UI ugly. Direction is 'forwards' to make animation ugly, 'reverse' to reset it
    changeUI = (direction='forwards') => {
        var uiBlock = document.getElementById('ui-block');
        var CSSArray = cssChange.split('');
        // Make it play a little slower when forwards, a bit faster when in reverse
        let delay = direction === 'reverse' ? 5 : 15;
        // Lop through CSSArray and add contents to uiBlock in 'forwards' or 'reverse
        let i = 0;
        var write = function() {
            if (direction === 'reverse') {
                uiBlock.innerHTML = uiBlock.innerHTML.slice(0, -1);
            } else {
                uiBlock.innerHTML += CSSArray[i];
            }
            i++;
            // Stop once we're at the end of CSSArray
            if (i >= CSSArray.length){ clearInterval(loop) }
      }
      var loop = setInterval(write, delay)
    }
}

export const EasterEgg = new Easter_Egg()
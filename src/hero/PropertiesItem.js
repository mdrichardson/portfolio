import React from 'react';

// For Easter Eggs
const errorStyle = [
    'color: white',
    'background: red',
    'font-size: 14px'
].join(';'); 

const dynamicClassesToHide = [
    'skillsItem',
    'project-container',
    'submit',
    'looking-for'
]

var dynamicElements = []

var boolElements = []

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
class PropertiesItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '',
                       easterEgg: [],
                      }
    }

    componentDidMount() {
        this.setState({ value: this.props.value,
                        easterEgg: this.props.egg })
    }

    handleChange = (event) => {
        event.preventDefault();
        // Don't let us make the value more than 5 characters (for 'false')
        if (event.target.value.length > 5) { return }
        this.setState({ value: event.target.value });
        // This dynamically adjusts input size. For some reason, it adds an extra 3 characters
        // The Math.max keeps the size attribute from going negative
        event.target.setAttribute('size', Math.max(1, event.target.value.length - 3));
    }

    // Allow easter egg trigger when pressing enter, as well as onBlur
    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.easterEgg(event)
        }
    }

    easterEgg = (event) => {
        event.preventDefault();
        // Decide whether to trigger easter egg or set back to normal
        switch(event.target.value) {
            case 'false':
                this.easterEggFalse();
                break;
            case 'true':
                this.easterEggTrue();
                break;
            default:
                // Otherwise, reset value to true and do nothing
                this.setState({ value: 'true' });
        }
    }

    // Mess with UI based off of the easterEgg values passed through props
    // Cases: console, dynamic_items, ui, scroll
    easterEggFalse = () => {
        // Display notification that user broke something, so they can return it to normal and don't miss anything
        let brokenNotification = document.getElementById('broken-notification');
        brokenNotification.style.display = 'block';
        // Now handle the eggs
        this.state.easterEgg.forEach(egg => {
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
    easterEggTrue = () => {
        // First handle the eggs
        this.state.easterEgg.forEach(egg => {
            switch(egg) {
                case 'console':
                    // Clear console
                    console.clear();
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

    changeUI = (direction='forwards') => {
        var uiBlock = document.getElementById('ui-block');
        var CSSArray = cssChange.split('');
        let delay = direction === 'reverse' ? 5 : 15;
        let i = 0;
        var write = function() {
            if (direction === 'reverse') {
                uiBlock.innerHTML = uiBlock.innerHTML.slice(0, -1);
            } else {
                uiBlock.innerHTML += CSSArray[i];
            }
            i++;
            if (i >= CSSArray.length){ clearInterval(loop) }
        }
        var loop = setInterval(write, delay)
    }

    render() {
        return(
            <p>{this.props.name}:{' '}  
                <input type="text"
                className="bool"
                name={ this.props.name }
                value={ this.state.value }
                onChange={ this.handleChange }
                onBlur={ this.easterEgg }
                onKeyPress={ this.handleKeyPress }
                size="1" />,{/* Comma is necessary */}
            </p>
            )
        }
}

export default PropertiesItem
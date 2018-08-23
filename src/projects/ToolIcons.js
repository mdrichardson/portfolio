import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngular, faNodeJs } from '@fortawesome/free-brands-svg-icons';

const fa_size = '2x';

// React doesn't work well with SVG files, so we have to copy the code inside the SVG and use it here.
// Convert to valid JSX at https://svg2jsx.herokuapp.com/
const mongodbSVG = (
    <svg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg'
viewBox='0 0 895.39 2000'>
    <defs />
    <path className='cls-1' d='M454.69,1494.67c-10.33,131.42-25.17,227.34-39.76,260.8,0,0-2.06-1.41-5.77-4.12,36.65,85.35,33,231.39,33,231.39l53.58,17.76s-10.88-141.69,4.29-210.2c4.59-20.72,15.16-38.85,27.64-54.08-2,1.39-3.06,2.09-3.06,2.09C472.21,1714.17,457,1600.59,454.69,1494.67Z'
    transform='translate(-2.3 -.5)' />
    <path className='cls-2' d='M881.14,793.69c-105-463.24-353-615.51-379.68-673.66C472.12,78.89,442.58,6,442.58,6l0,1C467.43,103,463.22,877.61,466,970.39c5.85,194,0,380.42-11.34,524.28,2.29,105.92,17.51,219.5,70,243.65,0,0,1.06-.7,3.06-2.09,8.26-5.76,32.72-23.54,65.35-53.44l2.31-2.11C721.1,1564.65,963,1272.31,881.14,793.69Z'
    transform='translate(-2.3 -.5)' />
    <path className='cls-3' d='M454.69,1494.67C466,1350.81,471.88,1164.41,466,970.39,463.22,877.61,467.43,103,442.59,7A40.51,40.51,0,0,0,440.45.5c-3,40.89-4.61,56.87-43.45,98.32-60.07,47-368.52,305.72-393.65,832C-20.08,1421.59,357.93,1714,409.16,1751.35c3.72,2.71,5.77,4.12,5.77,4.12C429.52,1722,444.37,1626.09,454.69,1494.67Z'
    transform='translate(-2.3 -.5)' />
</svg>
)

const cSVG = (
    <svg id='Layer_1' viewBox='0 0 96 96' xmlns='http://www.w3.org/2000/svg'>
    <path d='M87,9v67.4L48.8,86.6c-0.1,0-0.4,0.1-0.8,0.1s-0.8,0-0.8-0.1L9,76.4V9h36.6h4.9H87 M90.6,3H50.4c-1.3,0-3.6,0-4.9,0H5.4 C4.1,3,3,4.1,3,5.4v73.1c0,1.3,1.1,2.7,2.4,3.1l40.3,10.7c0.7,0.2,1.5,0.3,2.4,0.3s1.7-0.1,2.4-0.3l40.3-10.7 c1.3-0.3,2.4-1.7,2.4-3.1V5.4C93,4.1,91.9,3,90.6,3L90.6,3z'
    />
    <line className='st0' x1='3' x2='93' y1='18' y2='18' />
    <path className='st0' d='M4,70l41.4,11.3c1.4,0.4,3.7,0.4,5.1,0L92,70'
    />
    <path d='M22,48.1C22,40.5,27,36,32.7,36c2.9,0,5.3,1.4,6.8,3l-2.7,3.3c-1.1-1.1-2.4-1.8-4-1.8c-3.1,0-5.5,2.8-5.5,7.5 c0,4.8,2.2,7.5,5.5,7.5c1.8,0,3.3-1,4.4-2.2l2.7,3.3C38,58.8,35.5,60,32.5,60C26.8,60,22,55.9,22,48.1z'
    />
    <path d='M46.9,49.7h-6.1V46h6.1v-6.5h3.7V46h6.1v3.7h-6.1v6.5h-3.7V49.7z'
    />
    <path d='M64.1,49.7H58V46h6.1v-6.5h3.7V46H74v3.7h-6.1v6.5h-3.7V49.7z'
    />
</svg>
)

const iconMap = {
    'Angular 6': <FontAwesomeIcon icon={faAngular} size={fa_size} />,
    'Node.js': <FontAwesomeIcon icon={faNodeJs} size={fa_size} />,
    'MongoDB': mongodbSVG,
    'C/C++': cSVG,
}

const ToolIcons = (props) => (
    props.list.map(icon => (
        <div key={icon} title={icon} aria-hidden>{iconMap[icon]}</div>
    ))
)
        

export default ToolIcons;
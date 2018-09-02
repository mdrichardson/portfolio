import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngular, faNodeJs, faPython, faReact, faJs, faSass, faRedditAlien, faAws, faLinux } from '@fortawesome/free-brands-svg-icons';

const fa_size = '2x';

// React doesn't allow you to import SVG files directly (forces as img), so we have to copy the code inside the SVG and use it here.
// Convert to valid JSX at https://svg2jsx.herokuapp.com/
const typescriptSVG = (<svg style={{padding: '0.3em'}} version='1' xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 256.000000 256.000000'>
        <path d='M0 128v128h256V0H0v128zm157-4.5V135h-33v105H97V135H64v-23h93v11.5zm65-10.1c4.1.8 8.7 1.9 10.3 2.5l2.7 1.1v12.5c0 6.9-.2 12.5-.4 12.5s-2.3-1.1-4.7-2.4c-9-5.1-23.4-7-32.2-4.4-2.1.6-5.2 2.5-6.8 4.1-2.4 2.3-2.9 3.7-2.9 7.4 0 4 .5 5.1 3.8 8.2 2.1 2 9.9 6.6 17.5 10.4 16 7.9 24.1 14.6 27.8 22.9 3.3 7.4 3.4 23 .2 30-3 6.6-9.6 13.3-16.1 16.4-13.8 6.5-36.3 7.1-53.9 1.3l-6.3-2.1V206l5 3.6c6.5 4.7 14.9 7.6 23.7 8.2 8.8.6 15.3-1 19.3-4.8 2.5-2.3 3-3.6 3-7.4 0-7.3-4.2-11.1-21.4-19.5-15.2-7.5-20-10.9-24.5-17.5-10-14.5-7-36.7 6.4-46.8 11.4-8.7 30.3-11.9 49.5-8.4z'
        />
    </svg>)

const mongodbSVG = (<svg style={{padding: '0.2em'}} id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg'
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

const cSVG = (<svg style={{padding: '0.3em'}} id='Layer_1' viewBox='0 0 96 96' xmlns='http://www.w3.org/2000/svg'>
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

const sqlSVG = (<svg style={{padding: '0.3em'}} baseProfile='tiny' id='Layer_1' overflow='scroll' viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'>
    <path d='M22.2138672,22.75V20c0-0.4140625-0.3359375-0.75-0.75-0.75s-0.75,0.3359375-0.75,0.75v2H3.2617188v-2 c0-0.4140625-0.3359375-0.75-0.75-0.75s-0.75,0.3359375-0.75,0.75v2.75c0,0.4140625,0.3359375,0.75,0.75,0.75h18.9521484 C21.8779297,23.5,22.2138672,23.1640625,22.2138672,22.75z'
    fill='#1D1D1D' />
    <path d='M22.2382813,5c0-0.1977539-0.078125-0.387207-0.2167969-0.5273438l-3.7099609-3.75 C18.1708984,0.5800781,17.9785156,0.5,17.7783203,0.5H2.5117188c-0.4140625,0-0.75,0.3359375-0.75,0.75V7.5 c0,0.4140625,0.3359375,0.75,0.75,0.75s0.75-0.3359375,0.75-0.75V2h12.9765625v4c0,0.4140625,0.3359375,0.75,0.75,0.75h3.75V7.5 c0,0.4140625,0.3359375,0.75,0.75,0.75s0.75-0.3359375,0.75-0.75V5z M17.7382813,2.2763062L20.6807861,5.25h-2.9425049V2.2763062z'
    fill='#1D1D1D' />
    <path d='M14,9.75h-4c-0.4140625,0-0.75,0.3359375-0.75,0.75V17c0,0.4140625,0.3359375,0.75,0.75,0.75h3.6894531 l0.7802734,0.7802734C14.6162109,18.6767578,14.8076172,18.75,15,18.75s0.3837891-0.0732422,0.5302734-0.2197266 c0.2929688-0.2929688,0.2929688-0.7675781,0-1.0605469L14.75,16.6894531V10.5C14.75,10.0859375,14.4140625,9.75,14,9.75z M10.75,16.25v-5h2.5v3.9394531l-0.2197266-0.2197266c-0.2929688-0.2929688-0.7675781-0.2929688-1.0605469,0 s-0.2929688,0.7675781,0,1.0605469L12.1894531,16.25H10.75z'
    fill='#1D1D1D' />
    <path d='M2.8632813,16.25c-0.4140625,0-0.75,0.3359375-0.75,0.75s0.3359375,0.75,0.75,0.75H6.5 c0.4140625,0,0.75-0.3359375,0.75-0.75v-3.1367188c0-0.4140625-0.3359375-0.75-0.75-0.75H3.6132813V11.25H6.5 c0.4140625,0,0.75-0.3359375,0.75-0.75S6.9140625,9.75,6.5,9.75H2.8632813c-0.4140625,0-0.75,0.3359375-0.75,0.75v3.3632813 c0,0.4140625,0.3359375,0.75,0.75,0.75H5.75V16.25H2.8632813z'
    fill='#1D1D1D' />
    <path d='M17.4423828,9.75c-0.4140625,0-0.75,0.3359375-0.75,0.75V17c0,0.4140625,0.3359375,0.75,0.75,0.75h3.6367188 c0.4140625,0,0.75-0.3359375,0.75-0.75s-0.3359375-0.75-0.75-0.75h-2.8867188V10.5 C18.1923828,10.0859375,17.8564453,9.75,17.4423828,9.75z'
    fill='#1D1D1D' />
    </svg>)

const postgresSVG = (<svg style={{padding: '0.3em'}} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50' width='50'
    height='50'>
    <path d='M 34.902344 2 C 32.863281 2 31.097656 2.550781 29.875 3.09375 C 28.675781 2.691406 26.6875 2.003906 24.300781 2.5 C 22.910156 2.742188 21.632813 3.316406 20.460938 4.195313 C 18.53125 3.265625 16.515625 2.695313 14.402344 2.601563 C 13.101563 2.5 7.800781 3.101563 5.898438 5.898438 C 5.199219 7 4.5 8.398438 4.199219 10.097656 C 3.898438 11.597656 3.898438 13.300781 4.398438 16.800781 C 4.699219 19.199219 5.101563 20.800781 6 24.097656 C 6.101563 24.398438 6.601563 26 8.101563 30.402344 C 8.398438 31.199219 9 32.699219 10.199219 34.097656 C 11 35.097656 11.800781 35.699219 12.800781 35.699219 C 14.101563 35.699219 15 34.800781 15.800781 33.800781 C 15.859375 33.734375 15.921875 33.660156 15.980469 33.59375 C 15.90625 33.710938 15.839844 33.839844 15.800781 34 C 15.601563 35 16.800781 35.800781 17.800781 36.199219 C 18.601563 36.597656 19.5 36.699219 20.199219 36.699219 C 21.097656 36.699219 21.800781 36.5 22.199219 36.402344 C 22.542969 36.285156 23.285156 35.964844 24.078125 35.4375 C 24.113281 37.992188 24.136719 41.007813 24.199219 41.699219 C 24.5 44.300781 25.199219 46.097656 26.5 47.097656 C 27.5 47.898438 29.300781 48 29.402344 48 C 31.199219 48 34 46.800781 35.199219 44.902344 C 35.800781 44 36 43.199219 36.199219 42.097656 C 36.398438 41.5 36.597656 38 36.699219 37.300781 C 36.835938 36.195313 36.941406 35.105469 37.046875 34.046875 C 37.707031 34.21875 38.519531 34.402344 39.402344 34.402344 C 41 34.402344 43.101563 33.300781 43.5 33.097656 C 44.300781 32.5 45.898438 31.101563 45.199219 29.902344 C 44.800781 29.199219 44.199219 29.199219 42.699219 29.402344 C 42.699219 29.402344 40.300781 29.699219 40.097656 29.597656 C 39.953125 29.542969 39.730469 29.402344 39.480469 29.21875 C 40 28.414063 40.460938 27.617188 41 26.902344 C 42.199219 24.601563 42.902344 22.800781 43.402344 21.402344 C 44.300781 18.902344 44.800781 16.898438 45.097656 15.5 C 45.800781 12.5 46 11.101563 45.597656 9.5 C 44.800781 6.699219 41.898438 4.300781 40.699219 3.601563 C 39.898438 3.199219 37.902344 2 34.902344 2 Z M 34.902344 4 C 37.402344 4 39.101563 5 40 5.398438 C 41.101563 6 43.601563 8 43.800781 9.898438 C 43.902344 11 44 12.101563 43.300781 15 C 42.902344 16.398438 42.5 18.199219 41.597656 20.699219 C 41.097656 22.097656 40.5 23.800781 39.300781 25.902344 C 39.269531 25.953125 39.234375 26.007813 39.203125 26.0625 C 39.320313 25.640625 39.402344 25.300781 39.402344 25.300781 C 39.601563 24.300781 39.601563 23.5 39.5 22.300781 C 39.398438 21.699219 39.300781 20.199219 39.300781 19.597656 C 39.300781 19.300781 39.597656 16.199219 39.699219 15.097656 C 39.800781 13.300781 38.699219 11.097656 38.402344 10.699219 C 36.902344 8.398438 36.101563 7.101563 34.5 5.800781 C 34.101563 5.460938 33.417969 4.894531 32.488281 4.324219 C 33.222656 4.144531 34.035156 4 34.902344 4 Z M 26.066406 4.410156 C 27.371094 4.441406 28.476563 4.800781 29.300781 5.101563 C 31.402344 5.800781 32.699219 6.898438 33.300781 7.398438 C 34.601563 8.5 35.300781 9.601563 36.800781 11.902344 C 36.910156 12.121094 37.195313 12.585938 37.421875 13.234375 C 35.375 13.046875 34.015625 13.765625 33.199219 14.5 C 32 15.5 32.097656 17 32.199219 18.097656 C 32.199219 18.898438 32.402344 19.902344 33.902344 23.300781 C 34.5 24.800781 35.097656 26.398438 35.699219 27.5 C 36.011719 28.121094 36.394531 28.691406 36.804688 29.199219 C 36.566406 29.320313 36.324219 29.476563 36.097656 29.699219 C 35.5 30.398438 35.398438 31.101563 35.199219 32.402344 C 35 33.402344 34.800781 35.5 34.699219 37.199219 C 34.699219 37.898438 34.402344 41.300781 34.300781 41.800781 C 34 42.800781 33.898438 43.300781 33.5 43.902344 C 32.800781 45 30.601563 45.902344 29.300781 45.800781 C 28.902344 45.800781 28.300781 45.800781 27.800781 45.402344 C 26.699219 44.601563 26.300781 42.800781 26.199219 41.402344 C 26.097656 40.402344 26.199219 33.199219 26 31.597656 C 25.898438 31.199219 25.800781 30.199219 25 29.5 C 24.664063 29.21875 23.96875 29.074219 23.3125 28.976563 C 23.320313 28.640625 23.339844 28.304688 23.402344 28 C 23.5 27.398438 23.699219 27.097656 23.902344 26.597656 C 24 26.300781 24.199219 25.902344 24.402344 25.402344 C 25.300781 22.601563 25.097656 18.898438 24.597656 16.597656 C 24.5 16.398438 24.097656 14.800781 22.699219 13.902344 C 21.199219 13 19.597656 13.5 18.699219 13.800781 C 18.328125 13.902344 17.960938 14.0625 17.59375 14.25 C 17.65625 13.832031 17.710938 13.410156 17.800781 13 C 18.199219 11 18.601563 9.300781 19.902344 7.601563 C 21.300781 5.898438 22.898438 4.800781 24.699219 4.5 C 25.175781 4.425781 25.632813 4.398438 26.066406 4.410156 Z M 13.71875 4.585938 C 13.953125 4.582031 14.152344 4.585938 14.300781 4.601563 C 15.863281 4.683594 17.359375 5.050781 18.84375 5.675781 C 18.660156 5.878906 18.476563 6.082031 18.300781 6.300781 C 16.601563 8.300781 16.199219 10.398438 15.800781 12.5 C 15.300781 15 15.199219 17.597656 15.597656 20.199219 L 15.402344 22.097656 C 15.300781 23.097656 15.097656 25 16.199219 27 C 16.585938 27.664063 17.011719 28.226563 17.480469 28.707031 C 16.464844 30.050781 15.386719 31.320313 14.300781 32.5 C 13.699219 33.199219 13.199219 33.699219 12.800781 33.699219 C 12.699219 33.699219 12.300781 33.5 11.699219 32.800781 C 10.597656 31.601563 10.199219 30.300781 10 29.800781 C 8.800781 26.199219 8.101563 23.898438 8 23.597656 C 7.199219 20.398438 6.800781 18.800781 6.398438 16.5 C 5.898438 13.300781 5.898438 11.699219 6.199219 10.402344 C 6.5 9 7 7.898438 7.5 7.101563 C 8.726563 5.175781 12.09375 4.628906 13.71875 4.585938 Z M 36.664063 15.125 C 36.984375 15.125 37.332031 15.164063 37.699219 15.242188 C 37.6875 16.175781 37.300781 19.105469 37.300781 19.5 C 37.300781 20.300781 37.5 21.898438 37.5 22.5 C 37.601563 23.601563 37.601563 24.199219 37.5 25 C 37.5 25 37.351563 25.714844 37.199219 26.222656 C 36.734375 25.171875 36.21875 23.917969 35.597656 22.5 C 34.097656 19.101563 34 18.402344 34 17.902344 C 34 17.199219 34 16.300781 34.597656 15.902344 C 35.160156 15.402344 35.84375 15.132813 36.664063 15.125 Z M 21.140625 15.417969 C 21.339844 15.441406 21.523438 15.5 21.699219 15.597656 C 22.5 16 22.699219 17 22.699219 17 C 23.199219 19.199219 23.398438 22.5 22.597656 24.699219 C 22.5 25.097656 22.300781 25.398438 22.199219 25.699219 C 22 26.199219 21.800781 26.699219 21.597656 27.597656 C 21.546875 27.96875 21.523438 28.335938 21.511719 28.703125 C 20.820313 28.558594 20.167969 28.3125 19.699219 28 C 18.898438 27.601563 18.300781 26.898438 17.902344 26.097656 C 17.199219 24.597656 17.300781 23.199219 17.402344 22.402344 L 17.597656 20.097656 C 17.457031 18.972656 17.390625 17.84375 17.40625 16.722656 C 17.867188 16.328125 18.46875 15.925781 19.300781 15.699219 C 19.902344 15.550781 20.558594 15.34375 21.140625 15.417969 Z M 35.886719 16.089844 C 35.625 16.101563 35.347656 16.148438 35.199219 16.199219 C 34.800781 16.300781 34.699219 16.300781 34.597656 16.5 C 34.5 16.699219 34.800781 17 34.902344 17.199219 C 35 17.199219 35.300781 17.5 35.699219 17.402344 C 36 17.300781 36.199219 17.101563 36.300781 17 C 36.402344 16.898438 36.800781 16.398438 36.5 16.199219 C 36.398438 16.097656 36.148438 16.074219 35.886719 16.089844 Z M 20.914063 16.816406 C 20.804688 16.824219 20.699219 16.851563 20.597656 16.902344 C 20.5 16.902344 20.300781 17 20.199219 17.199219 C 20.097656 17.398438 20.199219 17.597656 20.300781 17.699219 C 20.5 18 20.800781 18.300781 21.300781 18.300781 C 21.402344 18.300781 21.800781 18.300781 22.097656 18 C 22.097656 18 22.402344 17.699219 22.402344 17.402344 C 22.300781 17.199219 22.101563 17.101563 21.800781 17 C 21.574219 16.925781 21.238281 16.792969 20.914063 16.816406 Z M 19.074219 29.902344 C 19.6875 30.230469 20.425781 30.496094 21.234375 30.679688 C 21.019531 31.109375 20.710938 31.464844 20.402344 31.699219 C 19.699219 32.199219 18.800781 32.5 17.902344 32.699219 C 17.699219 32.699219 17.601563 32.800781 17.402344 32.800781 C 16.917969 32.9375 16.449219 33.089844 16.128906 33.421875 C 17.109375 32.332031 18.09375 31.128906 19.074219 29.902344 Z M 38.355469 30.703125 C 38.792969 31.03125 39.222656 31.273438 39.597656 31.402344 C 40.199219 31.601563 40.699219 31.601563 42.5 31.402344 C 42.199219 31.699219 41.300781 32.199219 40 32.402344 C 39.164063 32.484375 38.125 32.285156 37.28125 32.042969 C 37.359375 31.476563 37.449219 31.152344 37.597656 31 C 37.652344 30.949219 37.984375 30.847656 38.355469 30.703125 Z M 23.296875 31.003906 C 23.503906 31.039063 23.667969 31.066406 23.699219 31.097656 C 23.898438 31.300781 24 31.800781 24 32 C 24.011719 32.171875 24.019531 32.605469 24.027344 32.90625 C 23.203125 33.871094 21.878906 34.40625 21.597656 34.5 C 21.199219 34.699219 20 34.898438 18.800781 34.5 C 19.800781 34.199219 20.800781 33.902344 21.597656 33.300781 C 22.296875 32.800781 22.898438 32.003906 23.296875 31.003906 Z'
    id='surface1' />
    </svg>)

const seleniumSVG = (<svg style={{padding: '0.3em'}} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50' width='50'
    height='50'>
    <path d='M 43.582031 2 L 29.535156 17.201172 L 22.226562 10.402344 L 19 13.802734 L 29.724609 24 L 47 5.2109375 L 43.582031 2 z M 9 4 C 6.2504839 4 4 6.2504839 4 9 L 4 41 C 4 43.749516 6.2504839 46 9 46 L 41 46 C 43.749516 46 46 43.749516 46 41 L 46 18.25 L 46 9.25 L 44 11.419922 L 44 18.25 L 44 41 C 44 42.668484 42.668484 44 41 44 L 9 44 C 7.3315161 44 6 42.668484 6 41 L 6 9 C 6 7.3315161 7.3315161 6 9 6 L 30.875 6 C 30.877007 6.0000116 30.878849 6 30.880859 6 L 37.160156 6 L 39.009766 4 L 30.880859 4 A 1.0001 1.0001 0 0 0 30.875 4 L 9 4 z M 14.636719 22 C 10.909719 22 8.453125 24.010391 8.453125 27.025391 C 8.453125 29.492391 9.9082031 31.044391 12.908203 31.775391 L 15.091797 32.324219 C 17.364797 32.872219 18.273437 33.603609 18.273438 34.974609 C 18.273438 36.527609 16.727719 37.623047 14.636719 37.623047 C 12.363719 37.623047 10.819875 36.644 10.546875 35 L 8 35 C 8.182 38.015 10.727078 40 14.455078 40 C 18.455078 40 21 37.990172 21 34.701172 C 21 32.143172 19.545797 30.680422 16.091797 29.857422 L 14.181641 29.400391 C 11.999641 28.852391 11.091797 28.212594 11.091797 26.933594 C 11.091797 25.380594 12.455875 24.376953 14.546875 24.376953 C 16.546875 24.376953 17.909641 25.380594 18.181641 26.933594 L 20.726562 26.933594 C 20.635562 24.009594 18.091719 22 14.636719 22 z M 30.089844 27 C 26.339844 27 24 29.559062 24 33.539062 C 24 37.519062 26.339844 40 30.089844 40 C 33.089844 40 35.250547 38.670906 35.810547 36.378906 L 33.279297 36.378906 C 32.809297 37.351906 31.689453 37.876953 30.189453 37.876953 C 28.119453 37.876953 26.719141 36.249 26.619141 34.125 L 26.619141 33.945312 L 36 33.945312 L 36 33.28125 C 36 29.39125 33.749844 27 30.089844 27 z M 30.089844 29.050781 C 31.949844 29.050781 33.139844 30.16 33.339844 32 L 26.75 32 C 26.97 30.23 28.239844 29.050781 30.089844 29.050781 z'
    fontWeight='400' fontFamily='sans-serif' overflow='visible'
    />
    </svg>)

const iconMap = {
    'Angular 6': <FontAwesomeIcon icon={faAngular} size={fa_size} />,
    'TypeScript': typescriptSVG,
    'Node.js': <FontAwesomeIcon icon={faNodeJs} size={fa_size} />,
    'MongoDB': mongodbSVG,
    'C/C++': cSVG,
    'Python': <FontAwesomeIcon icon={faPython} size={fa_size} />,
    'Selenium': seleniumSVG,
    'SQLite': sqlSVG,
    'Postgres': postgresSVG,
    'React': <FontAwesomeIcon icon={faReact} size={fa_size} />,
    'JavaScript': <FontAwesomeIcon icon={faJs} size={fa_size} />,
    'Sass': <FontAwesomeIcon icon={faSass} size={fa_size} />,
    'RES': <FontAwesomeIcon icon={faRedditAlien} size={fa_size} />,
    'AWS': <FontAwesomeIcon icon={faAws} size={fa_size} />,
    'Linux': <FontAwesomeIcon icon={faLinux} size={fa_size} />
}

const ToolIcons = (props) => (
    props.list.map(icon => (
        <div key={icon} title={icon} aria-hidden>{iconMap[icon]}<p className="tool-name">{icon}</p></div>
    ))
)        

export default ToolIcons;
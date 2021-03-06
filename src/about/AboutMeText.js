import React from 'react';

const AboutMeText = 
    <div id="about-me-text">
        <p>
            I've been a hobby developer since the GeoCities and Angelfire days, back when "the Internet" came on a CD, web pages were ugly, 
            and half the text blinked or scrolled. I’ve built my own PCs, ran Ubuntu as my main OS for ~2 years 
            just for fun, flashed custom firmware to my router and smart light switches, wired my whole house up with Cat6, and have automated just about anything 
            I can think of with <a href="http://www.eventghost.net/" alt="EventGhost" target="_blank" rel="noopener noreferrer">EventGhost (Windows)</a> 
            , <a href="https://tasker.joaoapps.com/" alt="Tasker" target="_blank" rel="noopener noreferrer">Tasker (Android)</a>, and 
            <a href="http://homeassistant.io/" alt="Home Assistant" target="_blank" rel="noopener noreferrer">Home Assistant (Smart Hub)</a>.
      </p>
      <p>
            Despite always being interested in technology, I earned a BA and MBA in Marketing and spent my first six years of employment
            as a marketing manager. After ramping up my hobby development projects and self-study, I landed my first software gig as a 
            Support Engineer for Microsoft, which involved more debugging of others' code than anybody should be subjected to. Nonetheless, it was a role
            that I really thrived in; I love being around code.
      </p>
      <p>
            Call me a masochist, but I really, truly enjoy banging my head against a wall trying to solve a problem just to get that 
            tiny little rush of endorphins once I figure it out and make things work.
        </p>
        <p>
            { /* Multiple  classes are used ('games' and 'games') so that if a multi-word activity ('video games') is has a line break in the
                    middle, the tooltip pops up on the appropriate line */ }
            Outside of programming, I enjoy spending time with my <span className="wife hover-text">wife</span> and my <span className="dog hover-text">dog</span>,&nbsp;
            watching either the <span className="cougs hover-text">Cougars</span> or the <span className="sounders hover-text">Sounders</span>,&nbsp;
            playing <span className="games hover-text">video </span><span className="games hover-text">games</span> and&nbsp;
            <span className="guitar hover-text">guitar</span>, <span className="homebrewing hover-text">homebrewing </span>
            <span className="homebrewing hover-text">beer</span>, or hiking and camping <span className="outdoors hover-text">outdoors</span> in the beautiful Pacific Northwest.
        </p>
        <p className="statement">I'm results-driven, quick-learning, can code just about anything, and love a good challenge.</p>
    </div>

export default AboutMeText;
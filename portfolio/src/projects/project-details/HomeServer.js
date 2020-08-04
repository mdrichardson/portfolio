import imageSRC from '../../images/home-server.png'
import React from 'react';

const HomeServer = {
  id: 'homeserver',
  name: 'Home Server',
  url: null,
  github: null,
  image: imageSRC,
  tools: [
    'Linux',
    'Docker'
  ],
  short_desc: 'My home server runs several containers and VMs, including the portfolio that you\'re viewing now!',
  long_desc: 'I like tinkering and decided to build a home server. ' +
                'It\'s a very fun, ongoing project and it\'s mainly allowed me to take full nightly backups of all of my computers ' +
                'and run a lot of other always-on software that I use around my home. I get very excited thinking about new things to add ' +
                'and ways to upgrade!',
  bullets: [
    <span><strong>Hosts:</strong>
        <ul className="bullets">
          <li>This Portfolio Site (in a Docker container)</li>
          <li>Home Automation Software (Home Assistant)</li>
          <li>Firewall (OPNsense)</li>
          <li>Ubuntu VMs</li>
          <li>File Server</li>
          <li>Various Media Applications</li>
        </ul>
    </span>,
  ]
}

export default HomeServer;
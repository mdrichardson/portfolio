import imageSRC from '../../images/blog-admin.png'
import React from 'react';

const Blog = {
  id: 'blog-project',
  name: 'Blog',
  url: 'https://www.mdrichardson.net/blog',
  github: 'https://github.com/mdrichardson/portfolio/src/blog',
  image: imageSRC,
  tools: [
    'Node.js',
    'MongoDB',
    'React',
  ],
  short_desc: 'My blog is part of this portfolio site, but adds enough functionality to warrant it\'s own project listing',
  long_desc: 'Like many aspiring developers, I built this site to showcase my previous work and let you know ' +
                'a little bit more about me. It\'s definitely overkill to build this in React, since it\'s mostly ' +
                'a static site. However, this sets me up well for when I add a blog.',
  bullets: [
    'All data is stored in and retrieved from a MongoDB server',
    <span>Has a small Admin CMS
        <ul className="bullets">
          <li>Login authentication</li>
          <li>Add new posts</li>
          <li>Edit posts</li>
          <li>Add new post tags</li>
          <li>Preview unpublished articles</li>
        </ul></span>,
    'Articles are filterable by tags',
  ]
}

export default Blog;
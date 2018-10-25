import imageSRC from '../../images/blog-admin.png'
import React from 'react';

const Blog = {
  id: 'blog-project',
  name: 'Blog',
  url: 'https://www.mdrichardson.net/blog',
  github: 'https://github.com/mdrichardson/portfolio/',
  image: imageSRC,
  tools: [
    'Node.js',
    'MongoDB',
    'React',
  ],
  short_desc: 'My blog is part of this portfolio site, but adds enough functionality to warrant it\'s own project listing',
  long_desc: 'Since my portfolio is built in React, it made sense to add the blog alongside it. This project uses databases more extensively than any ' +
              'of my others and was great for learning more about async/await, MongoDB, and running Node.js servers.',
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
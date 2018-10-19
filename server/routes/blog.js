const express = require('express');
const router = express.Router();
const private = require('../private');
const mongoose = require('mongoose');

// Load models
require('../models/article')
const Article = mongoose.model('Article');
const Tag = require('../models/tag');

// Load private DB info
const db = private.DB_URL;

// Connect to db
var connectOptions = {
    user: private.DB_USER,
    pass: private.DB_PASS,
    auth: {
      authdb: private.DB_ADMIN_DB
    },
    useNewUrlParser: true
  }

  mongoose.connect(db, connectOptions, err => {
    if (err) {
        console.error('Error!' + err)
    } else {
        console.log('Connected to mongodb!')
    }
})

// Verify API works at all
router.get('/', (req, res) => {
    res.send('Blog route works!')
})

const getCurrentTags = async () => {
    const currentTags = await Tag.find().sort({ name: 'ascending' });
    const tagMap = currentTags.map(tag => tag.name);
    return tagMap
}

// Get Tags
router.get('/tags', (async (req, res) => {
    return res.send(await getCurrentTags());
}))

// Get all blog articles
router.get('/articles',(async (req, res, next) => {
    let articles = await Article.find();
    const publishedArticles = articles.filter(article => article.isPublished);
    return res.send(publishedArticles)
  }));
  

// Get blog article by ID
router.param('/articles/:id', (req, res, next, id) => {
    return Article.findById(id, (err, article) => {
        if(err) {
            return res.sendStatus(404);
        } else if(article && article.isPublished) {
            req.article = article;
            return next();
        }
    }).catch(next);
});

// Get blog article by slug
router.get('/articles/:slug', (req, res) => {
    return Article.findOne({
        slug: req.params.slug
    }, (err, article) => {
        console.log(article);
        if(err) {
            return res.sendStatus(404);
        } else if(article && article.isPublished) {
            return res.send(article)
        } else {
            return res.status(404).json({
                error: {
                    article: 'article doesn\'t exist or isn\'t published'
                }
            })
        }
    })
});

module.exports = router;
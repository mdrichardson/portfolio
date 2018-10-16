const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const private = require('../private');
const fs = require('fs');

// Load models
const User = require('../models/user');
require('../models/article');
const Article = mongoose.model('Article');
require('../models/tag');
const Tag = mongoose.model('Tag');

// Load private DB info
const db = private.DB_URL;
const private_cert = fs.readFileSync(private.JWT_KEY);
const public_cert = fs.readFileSync(private.JWT_PUB_KEY);

// Quick allow/disallow of registration. True for allow, false for disallow
var allow_registration = false;

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


// Register users
router.post('/register', (req, res) => {
    if (allow_registration) {
        bcrypt.hash(req.body.password, 10, function(err, hash){
            if (err) {
               return res.status(500).json({
                  error: err
               });
            } else {
                let userData = req.body;
                let user = new User(userData);
                user.password = hash;
                user.save((error, registeredUser) => {
                    if (error) {
                        console.log(error);
                    } else {
                        let payload = {
                            _id: registeredUser._id,
                            username: registeredUser.username,
                            role: registeredUser.role
                        };
                        let token = jwt.sign(payload, private_cert, { algorithm: 'RS256' });
                        res.status(200).send({token});
                    }
                })
            }
        })
    } else {
        res.status(500).send('Registration is currently disabled');
    }
})

// Allow users to login if they have a username/password already. Returns all user data as user object.
router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({username: userData.username}, (error, user) => {
    if (error) {
        console.log(error);
    } else {
        if (!user) {
            res.status(401).send('Invalid Username');
        } else {
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if(err) {
                    return res.status(401).json({
                       failed: 'Unauthorized Access'
                    });
                 }
                 if(result) {
                    let payload = {
                        _id: user._id,
                        username: user.username,
                        role: user.role
                    };
                    let token = jwt.sign(payload, private_cert, { expiresIn: '30d', algorithm: 'RS256' });
                    return res.status(200).send({token});
                 }
                 return res.status(401).json({
                    failed: 'Unauthorized Access'
                 });
              });
            }
        } 
    }) 
})

// Get all blog articles
router.get('/articles', (req, res, next) => {
    return Article.find()
      .sort({ createdAt: 'descending' })
      .then((articles) => res.send(articles))
      .catch(next);
  });
  

// Get blog article by ID
router.param('/articles/:id', (req, res, next, id) => {
    return Articles.findById(id, (err, article) => {
        if(err) {
        return res.sendStatus(404);
        } else if(article && article.isPublished) {
        req.article = article;
        return next();
        }
    }).catch(next);
});

router.get('/articles/:id', (req, res) => {
    // Return Unauthorized if article exists but isn't published - If user has token, they can use /preview:id to preview unpublished articles
    if(!req.article.isPublished) {
        return res.sendStatus(401);
    }
    return res.json({
        article: req.article.toJSON(),
    });
});

// Ensure all routes below require a token -- Must go after login/register, but before anything that should require valid token
router.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, public_cert, { algorithm: 'RS256' }, function(err, decoded) {      
        if (err) {
            console.log(err)
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
  
    } else {
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      });
    }
  });

const getAllSlugs = async () => {
    const allArticles = await Article.find();
    const slugMap = allArticles.map(article => article.slug);
    return slugMap
}

// Handle creating blog articles
router.post('/article', (async (req, res, next) => {
    const { body } = req;
  
    if(!body.slug) {
        return res.status(422).json({
          errors: {
            slug: 'is required',
          },
        });
    } else {
        const currentSlugs = await getAllSlugs();
        if(currentSlugs.indexOf(body.slug) > -1) {
            return res.status(422).json({
                errors: {
                  slug: 'already exists. must be unique',
                },
              });
        }
    }

    if(!body.title) {
      return res.status(422).json({
        errors: {
          title: 'is required',
        },
      });
    }
  
    if(!body.imageUrl) {
      return res.status(422).json({
        errors: {
          imageUrl: 'is required',
        },
      });
    } else {
        if (!body.imageUrl.includes('/blog-images/')) {
            body.imageUrl = `/blog-images/${body.imageUrl}`
        }
    }
    
    if(!body.imageXOffsetPercent) {
        body.imageXOffsetPercent = 0;
    }
    if(!body.imageYOffsetPercent) {
        body.imageYOffsetPercent = 0;
    }

    if(!body.summary) {
        return res.status(422).json({
          errors: {
            summary: 'is required',
          },
        });
      }

    if(!body.body) {
      return res.status(422).json({
        errors: {
          body: 'is required',
        },
      });
    }

    if(body.isPublished === 'undefined' || body.isPublished === null || !body.isPublished) {
        body.isPublished = false;
    }
  
    const finalArticle = new Article(body);
    return finalArticle.save()
      .then(() => res.json({ article: finalArticle.toJSON() }))
      .catch(next);
  }));  

// Get preview of unpublished article
router.param('/preview/:id', (req, res, next, id) => {
    return Articles.findById(id, (err, article) => {
        if(err) {
        return res.sendStatus(404);
        } else if(article && article.isPublished) {
        req.article = article;
        return next();
        }
    }).catch(next);
});


// Update blog article
router.patch('/articles:id', (req, res, next) => {
    const { body } = req;

    if(typeof body.title !== 'undefined') {
        req.article.title = body.title;
    }

    if(typeof body.author !== 'undefined') {
        req.article.author = body.author;
    }

    if(typeof body.body !== 'undefined') {
        req.article.body = body.body;
    }

    if(typeof body.isPublished !== 'undefined') {
        req.article.isPublished = body.isPublished;
    }

    return req.article.save()
        .then(() => res.json({ article: req.article.toJSON() }))
        .catch(next);
});
  

// Delete blog article
router.delete('/articles/:id', (req, res, next) => {
    return Articles.findByIdAndRemove(req.article._id)
        .then(() => res.sendStatus(200))
        .catch(next);
});

// Add article tags
router.post('/tags', (async (req, res, next) => {
    const { body } = req;

    // Get current tags so we make sure we don't add any duplicates
    const currentTags = await getCurrentTags();
    if (currentTags.includes(body.name)) {
        return res.status(422).json({
            errors: {
                name: 'exists',
            }
        })
    }
  
    if(!body.name) {
      return res.status(422).json({
        errors: {
          name: 'is required',
        },
      });
    } else {
        body.name = body.name.toLowerCase();
    }

    const finalTag = new Tag(body);
    return finalTag.save()
      .then(() => res.json({ tag: finalTag.toJSON() }))
      .catch(next);
}))

// Delete Tag
router.delete('/tag/:id', (req, res, next) => {
    return Tag.findByIdAndRemove(req.body._id)
        .then(() => res.sendStatus(200))
        .catch(next);
});

module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const private = require('../private');
const mongoose = require('mongoose');

// For using images
const path = require('path');
const upload_path = path.resolve(__dirname, '../../public/blog-images');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, upload_path)
    },
    filename: (req, file, cb) => {
        cb(null, convertFileName(file.originalname));
    }
});
const upload = multer({ storage: storage });

const convertFileName = (fileName) => {
    let newName = path.parse(fileName.replace(/[|&;$%@"<>()+, ]/g, "")).name;
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    }
    const dateString = `${yyyy}${mm}${dd}`
    return `${newName}-${dateString}${path.parse(fileName).ext}`
}

//JWT
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const private_cert = fs.readFileSync(private.JWT_KEY);
const public_cert = fs.readFileSync(private.JWT_PUB_KEY);

// Load models
require('../models/article')
const Article = mongoose.model('Article');
require('../models/tag');
const Tag = mongoose.model('Tag');

// Quick allow/disallow of registration. True for allow, false for disallow
var allow_registration = false;

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

const validateToken = (token) => {
    const response = jwt.verify(token, public_cert, { algorithm: 'RS256' }, function(err, decoded) {      
        if (err) {
          console.log(err)
          return false  
        } else {
          return decoded
        }
      });
    return response
}

router.post('/validateToken', (req, res) => {
    const { body } = req;

    if(!body.token) {
        return res.status(422).json({
            errors: {
                token: 'is required'
            }
        });
    } else {
        const validTokenIfExists = validateToken(body.token);
        if (validTokenIfExists) {
            return res.status(200).send();
        } else {
            return res.status(401).json({ success: false, message: 'Failed to authenticate token.' }).send();    
        }
    }


})

// Ensure all routes below require a token -- Must go after login/register, but before anything that should require valid token
router.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        const validTokenIfExists = validateToken(token);
        if (validTokenIfExists) {
            req.decoded = validTokenIfExists;
            next();
        } else {
            return res.json({ success: false, message: 'Failed to authenticate token.' });    
        }  
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
router.post('/article', upload.single('image'), (async (req, res, next) => {
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
  
    if(!req.file) {
      return res.status(422).json({
        errors: {
          image: 'is required',
        },
      });
    } else {
        body['image'] = `/blog-images/${ convertFileName(req.file.originalname) }`;
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

// Update blog article
router.patch('/articles/:id', (req, res, next) => {
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

const getCurrentTags = async () => {
    const currentTags = await Tag.find().sort({ name: 'ascending' });
    const tagMap = currentTags.map(tag => tag.name);
    return tagMap
}

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

// Get preview of unpublished article
router.get('/preview/:slug', (req, res) => {
    return Article.findOne({
        slug: req.params.slug
    }, (err, article) => {
        if(err) {
            return res.sendStatus(404);
        } else if(article) {
            return res.send(article)
        } else {
            return res.status(404).json({
                error: {
                    article: 'article doesn\'t exist'
                }
            })
        }
    })
});

module.exports = router;
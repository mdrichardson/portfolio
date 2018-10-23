const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
let { google } = require('googleapis');
const private = require('./private');
const cors = require('cors');

// Import private variables
const port = private.PORT;
const oauth2_id = private.OAUTH2_ID;
const oauth2_secret = private.OAUTH2_SECRET;
const refresh_token = private.OAUTH2_REFRESH;
const email = private.EMAIL;

// Set up Google SMTP client
let OAuth2 = google.auth.OAuth2;
let OAuth2Client = new OAuth2(
    oauth2_id,
    oauth2_secret,
    'https://developers.google.com/oauthplayground'
);
// Set refresh token
OAuth2Client.setCredentials({
    refresh_token: refresh_token
});
// Initialize access token variable
let accessToken = '';
// Get access token
OAuth2Client.refreshAccessToken((err, tokens) => accessToken = tokens.access_token);
// SMTP Settings
let smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: email,
        clientId: oauth2_id,
        clientSecret: oauth2_secret,
        refreshToken: refresh_token,
        accessToken: accessToken
    },
    tls: {
        rejectUnauthorized: false
    }
})

// For contact form submit limiting by user ID (IP address or userAgent strings if IP fails)
// When somebody submits contact form, adds day to contact_log
// Under that day, add that person's ID and counts +1 each time they submit
var contact_log = {}

const app = express();

// Force SSL
const https = require('https');
const fs = require('fs');

const privateKey = fs.readFileSync('../ssl/server.key', 'utf8');
const certificate = fs.readFileSync('../ssl/server.crt', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
};

// Set up CORS--for testing
app.use(cors());
app.use(function (req, res, next) {

    // Website you wish to allow to connect -- TODO: Remove localhost after testing
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, x-access-token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Body parser middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
  });

app.get('/', (req, res) => {
    res.send('Success')
})

app.post('/send', (req, res) => {
    const body = req.body;
    // Limit id to send max 3x per day
    const id = body.id;
    const today = new Date()
    const date = `${today.getFullYear()}${today.getMonth()}${today.getDate()}`
    if (!contact_log[date]) {
        contact_log[date] = {}
    }
    if (contact_log[date][id] != undefined) {
        contact_log[date][id] = contact_log[date][id] + 1;
        if (contact_log[date][id] > 3) {
            return res.status(401).send('Permission Denied. Exceeded Contact Form Limit.')
        }
    } else {
        contact_log[date][id] = 1;
    }
    console.log(contact_log);

    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details:</h3>
        <ul>
            <li>Name: ${body.name}</li>
            <li>Email: ${body.email}</li>
        <ul>
        <h4>Message</h4>
        <p>${body.message}</p>
    `;

    // setup email data with unicode symbols
    let mailOptions = {
        from: `${body.name} <${body.email}>`, // sender address
        to: email, // list of receivers
        subject: '### NEW PORTFOLIO CONTACT ###', // Subject line
        generateTextFromHTML: true,
        html: output // html body
    };

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send('Unable to send contact form ', error);
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        res.status(200).send('Successfully Sent Contact Form');
        smtpTransport.close()
    });
})

// Init Blog
const blog = require('./routes/blog');
const blogAdmin = require('./routes/blogAdmin');

app.use('/blog', blog);
app.use('/blog/admin', blogAdmin);
app.get('/', function(req, res){
    res.send('Test successful!')
})

// Starting both http & https servers
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => console.log('Portfolio server started on port ' + port))


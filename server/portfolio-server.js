const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
let { google } = require('googleapis');
const private = require('./private');

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

const app = express();

// Body parser middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (req, res) => {
    res.send('Success')
})

app.post('/send', (req, res) => {
    const body = req.body;
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
            res.status(400).send('Unable to send contact form');
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        res.status(200).send('Successfully Sent Contact Form');
        smtpTransport.close()
    });
})

app.listen(port, () => console.log('Portfolio server started on port ' + port))


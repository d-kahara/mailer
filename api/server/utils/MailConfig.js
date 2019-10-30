/* eslint-disable import/prefer-default-export */
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const OAuth2 = google.auth.OAuth2;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const refreshToken = process.env.REFRESH_TOKEN;
const email = process.env.EMAIL;

const oauth2Client = new OAuth2(
  clientId, // ClientID
  clientSecret, // Client Secret
  'https://developers.google.com/oauthplayground' // Redirect URL
);

oauth2Client.setCredentials({ refresh_token: refreshToken });

const accessToken = oauth2Client.getAccessToken();

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: email,
    clientId,
    clientSecret,
    refreshToken,
    accessToken
  }
});

transporter.use('compile', hbs({
  viewEngine: {
    extName: '.hbs',
    partialsDir: path.resolve('moringa-mail/api/server/templates/'),
    layoutsDir: path.resolve('moringa-mail/api/server/templates/'),
    defaultLayout: '',
  },
  viewPath: path.resolve('api/server/templates/')
}));

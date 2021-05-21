require('dotenv').config('.env');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const { AUTH0_DOMAIN, AUTH0_AUDIENCE } = process.env

const jwksUri = `${AUTH0_DOMAIN}.well-known/jwks.json`;
const audience = `${AUTH0_AUDIENCE}`;
const issuer = `${AUTH0_DOMAIN}`;

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: jwksUri
    }),
    audience: audience,
    issuer: issuer,
    algorithms: ['RS256']
});

module.exports = { checkJwt };
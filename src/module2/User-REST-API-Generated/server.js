const express = require("express")
const app = express();
const { requiresAuth, auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: '8udQjschyFAyiLkdm9P7HvvNQwzbTJSbJ5N6t1F7bDShBltammMiboSWYxXVuPEh',
  baseURL: 'http://localhost:3000',
  clientID: '4X3BvGuhSUBlq3SwVDQvzERR4EtWAqED',
  issuerBaseURL: 'https://dev-g4-zglbv.eu.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(req.oidc.user)
})
  
app.listen(3000, () => console.log("User 0AUTH Ready!"));
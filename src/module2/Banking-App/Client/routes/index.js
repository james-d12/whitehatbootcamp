const dotenv = require('dotenv');
const router = require('express').Router();
const fetch = require("node-fetch");
const { requiresAuth } = require('express-openid-connect');

dotenv.load();

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

router.get('/profile', requiresAuth(), async (req, res, next) => {
  const { token_type, access_token } = req.oidc.accessToken;
  const email = (await req.oidc.fetchUserInfo()).email;

  try {
    const response = await fetch(`${process.env.SERVER_URL}/users/${email}/account`, {
      method: 'GET',
      crossDomain: true,
      headers: {
        'Accept': 'application/json',
        'Authorization': `${token_type} ${access_token}`
      }
    });

    const user = req.oidc.user;
    user.money = (await response.json()).money

    console.log(user)

    res.render('profile', {
      user: user,
      title: 'Profile page'
    });
  } catch (error) {
    res.redirect("/users/sync")
  }

});

router.get('/users', requiresAuth(), async (req, res) => {
  try {
    const { token_type, access_token } = req.oidc.accessToken;
    const response = await fetch(`${process.env.SERVER_URL}/users`, {
      method: 'GET',
      crossDomain: true,
      headers: {
        'Accept': 'application/json',
        'Authorization': `${token_type} ${access_token}`
      }
    });
    const users = await response.json();
    res.render("users", { users: users })

  } catch (error) {
    console.error(error);
  }
})

router.get('/users/sync', requiresAuth(), async(req, res, next) => {
  try {
    const { token_type, access_token } = req.oidc.accessToken;
    const email = (await req.oidc.fetchUserInfo()).email

    const data = {email: email, money: 100.50 }
    const response = await fetch(`${process.env.SERVER_URL}/users/${email}/account/sync`, {
      method: 'POST',
      crossDomain: true,
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${token_type} ${access_token}`
      }
    });
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
});

module.exports = router;

const express = require('express'),
  router = express.Router(),
  User = require("../models/sUser"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/register', function (req, res, next) {
  const { username, password } = req.body;

  bcrypt.hash(password, 5, (err, hash) => {
    // Store hash in your password DB.
    const user = new User({
      username,
      password: hash
    });
    const promise = user.save();
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });
  });
});

router.post("/authenticate", (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({
    username
  }, (err, data) => {
    if (err) throw (err);

    if (!data) {
      res.json({
        status: false,
        message: "Authentication failed, user not found."
      });
    }
    else {
      bcrypt.compare(password, data.password) //1.parametre : servisten gelen kullanıcnın girdiği şifre, 2.parametre : dbden gelen şifre
        .then((result) => { //resultdan true/false değeri döner
          if (!result) {
            res.json({
              status: false,
              message: "Authentication failed, wrong password."
            });
          }
          else {
            const payload = {
              username
            }
            const token = jwt.sign(
              payload,
              req.app.get("api_secret_key"),
              { expiresIn: 720 } //dk cinsinden değer alır yani 720dk=12sa
            );

            res.json({
              status: true,
              token
            });//kişi sisteme giriş yaptı ve token i oluşturuldu
          };
        });
    };
  });
});

module.exports = router;

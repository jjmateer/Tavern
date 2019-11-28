const db = require("../../models");
const bcrypt = require("bcryptjs");
const router = require("express").Router();
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

router.post("/register", function (req, res) {
  const { name, email, password, password2 } = req.body;
  switch (name, email, password, password2) {
    case password.length < 6:
      return res.status(400).json({ msg: "Password must be six characters or longer." })
    case password != password2:
      return res.status(400).json({ msg: "Passwords do not match." })
    case !name || !email || !password || !password2:
      return res.status(400).json({ msg: "Please fill out all fields." })
    case user:
      return res.status(400).json({ msg: "User already exists." })
    case !user:
      db.User.findOne({ email })
        .then(user => {
          if (!user) {
            let salt = bcrypt.genSaltSync(10);
            db.User.create({
              name: name,
              email: email,
              password: bcrypt.hashSync(password, salt),
            }).then(user => {
              jwt.sign({
                id: user.id
              }, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: {
                    id: user.id,
                    name: user.username,
                    email: user.email
                  }
                });
                console.log(`${user.name} added to database.`)
              })
            })


          }
        })
  }
}).catch(err => res.status(422).json({ msg: err }));
router.post("/login", function (req, res) {
  const { email, password } = req.body;
  switch (name, email, password, password2) {
    case !name || !email || !password || !password2:
      return res.status(400).json({ msg: "Please fill out all fields." })
    case user:
      return res.status(400).json({ msg: "User already exists." })
    case !user:
      return res.status(400).json({ msg: "Non-existent user." })
  }
  if (email === user.email && user && bcrypt.compareSync(password, user.password)) {
    jwt.sign({
      id: user.id
    }, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    })
    console.log(`${user.name} loggin authenticated.`)
  } else {
    return res.status(400).json({ msg: "Invalid password" })
  }
}).catch(err => res.status(422).json({ msg: err }));


router.get('/user', auth, (req, res) => {

  db.User.findById(req.body.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;
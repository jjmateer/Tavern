const db = require("../../models");
const bcrypt = require("bcryptjs")
const router = require("express").Router();
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
// const auth = require("../middleware/auth");

router.post("/register", function (req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please fill out all fields." })
  } else {
    db.User.findOne({ email })
      .then(user => {
        if (!user) {
          let salt = bcrypt.genSaltSync(10);
          db.User.create({
            username: username,
            email: email,
            password: bcrypt.hashSync(password, salt),
          }).then(user => {
            jwt.sign({
              id: user.id
            }, 'secretkey', { expiresIn: 3600 }, (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.username,
                  email: user.email
                }
              });
              console.log(`User info: ${user}`)
              console.log(`User token: ${token}`)
              console.log(`User ${user.id} added to database.`)
            })
          })
        }
        if (user) {
          return res.status(400).json({ msg: "User already exists." })
        }
      })
      .catch(err => res.status(422).json(err));
  }
});

router.post("/login", function (req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please fill out all fields." })
  } else {
    db.User.findOne({ email })
      .then(user => {
        if(!user) {
          return res.status(400).json({ msg: "Non-existent user." })
        }
        if (email === user.email && user && bcrypt.compareSync(password, user.password)) {
          jwt.sign({
            id: user.id
          }, 'secretkey', { expiresIn: 3600 }, (err, token) => {
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
        } else {
          return res.status(400).json({ msg: "Invalid password" })
        }
      })
      .catch(err => res.status(422).json(err));
  }
});


router.get('/user', auth, (req, res) => {
  
  db.User.findById(req.body.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;
const bcrypt = require('bcryptjs');
const User = require('../models/users.js');

const usersController = {};

usersController.index = (req, res) => res.json({ user: req.user, data: 'Put a user profile on this route' });

usersController.create = async (req, res) => {
  console.log(`userController.create`)
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password_digest, salt);
  try {
    const user = await User.create({ name: req.body.name, username: req.body.username, email: req.body.email, password_digest: hash })
    req.login(user,
      (err) => err && next(err),
      res.json({ user: req.user, data: 'User profile message' })
    )
  }
  catch (error) {
    console.log(error);
    res.status(500).json({error});
  };
}




module.exports = usersController;
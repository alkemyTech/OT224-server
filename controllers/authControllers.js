const { User } = require("../models");
const bcrypt = require("bcrypt");
const { tokenGenerator } = require('../helpers/tokenGenerator')

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      res.status(401).json({ msg: "Unauthorized" });
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = tokenGenerator(user)
        res.status(200).json({
          token: token,
        });
      } else {
        res.status(401).json({ msg: "Unauthorized" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { login };

const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

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
        const token = jwt.sign(
          {
            user: {
              firstName:user.firstName,
              lastName:user.lastName,
              email:user.email,
              photo:user.photo,
              roleId:user.roleId
            }
          },
          process.env.PRIVATE_KEY,
          {
            expiresIn: process.env.EXPIRES_IN
          }
        )
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

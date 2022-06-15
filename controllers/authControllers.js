const { User } = require("../models");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      res.json({ ok: false });
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200).json({
          user: user,
        });
      } else {
        res.status(401).json({ msg: "Incorrect password" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

module.exports = { login };

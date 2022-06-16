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
      res.status(401).json({ ok: "Unauthorized" });
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200).json({
          user: user,
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

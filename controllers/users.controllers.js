const ModeloUser = require("../models").User;

const getAllUsers = async (req, res) => {
  try {
    const users = await ModeloUser.findAll();
    if (!users) {
      res.status(400).json({
        msg: "users not found",
      });
    } else {
      res.status(200).send(users);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const createUser = async (req, res) => {
  res.send("hello from create user");
};

const updateUser = async (req, res) => {
  res.send("Hello from update user");
};

const deleteUser = async (req, res) => {
  res.send("Hello from delete user");
};

const findUserById = async (req, res, next) => {
  try {
    return res.status(200).send(await ModeloUser.findByPk(req.params.id));
  } catch (error) {
    console.log(error);
    next(err);
  }
};

const findMe = async (req, res, next) => {
  return res.status(200).send(res.user);
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  findUserById,
  findMe,
};

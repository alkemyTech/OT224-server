const ModeloUser = require("../models").User;
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { welcomeEmail } = require("../services/welcomeEmail");
const { tokenGenerator } = require("../helpers/tokenGenerator");
const BaseController = require("./base.controller");

const getAllUsers = async (req, res) => {
  return BaseController.getAllModels(req, res, ModeloUser);
};

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, photo, roleId } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const pass = bcrypt.hashSync(password, parseInt(process.env.SALT));

    const user = await ModeloUser.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      photo: photo,
      password: pass,
      roleId: roleId ? roleId : 2,
    });

    const token = tokenGenerator(user);

    const emailSent = await welcomeEmail(user);
    res.status(200).json({ newUser: user, emailSent, token: token });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateUser = async (req, res) => {
  let inputVars = req.body;
  return BaseController.updateModel(req, res, ModeloUser, inputVars);
};

const deleteUser = async (req, res) => {
  return BaseController.deleteModel(req, res, ModeloUser);
};

const findMe = async (req, res) => {
  return res.status(200).json(req.user);
};

const getUserId = async (req, res) => {
  return BaseController.getModelById(req, res, ModeloUser);
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  findMe,
  getUserId,
};

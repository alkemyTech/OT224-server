const ActivityModel = require("../models").Activity;

const getAllActivities = async (req, res, next) => {
  try {
    const activities = await ActivityModel.findAll();
    return res.status(200).send(activities);
  } catch (error) {
    console.log(error);
    next(err);
  }
};

const getActivityById = async (req, res) => {
  try {
    const a = await ActivityModel.findByPk(req.params.id);
    return res.status(200).send(a);
  } catch (err) {
    next(err);
  }
};

const createActivity = async (req, res) => {
  try {
    let a = req.body;
    a = await ActivityModel.create(a);
    return res.status(201).send(a);
  } catch (err) {
    next(err);
  }
};

const updateActivity = async (req, res) => {
  try {
    const id = req.params.id;
    const a = await ActivityModel.update(req.body, { where: { id } });
    return res.status(201).send(a);
  } catch (err) {
    next(err);
  }
};

const deleteActivity = async (req, res) => {
  try {
    const id = req.params.id;
    const a = await ActivityModel.update(
      { deletedAt: new Date() },
      { where: { id } }
    );
    return res.status(200).send(a);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
};

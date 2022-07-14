const baseController = require("./base.controller");
const ActivityModel = require("../models").Activity;

const getAllActivities = async (req, res) => 
	await baseController.getAllModels(req, res, ActivityModel);

const getActivityById = async (req, res) => 
	await baseController.getModelById(req, res, ActivityModel);

const createActivity = async (req, res) => 
	await baseController.createModel(res, ActivityModel, req.body);

const updateActivity = async (req, res) => 
	await baseController.updateModel(req, res, ActivityModel, req.body);

const deleteActivity = async (req, res) => 
	await baseController.deleteModel(req, res, ActivityModel);

module.exports = {
	getAllActivities,
	getActivityById,
	createActivity,
	updateActivity,
	deleteActivity,
};

const {
	getAllModels,
    getModelById,
	createModel,
    updateModel,
    deleteModel
} = require('../controllers/base.controller');

const ActivityModel = require("../models").Activity;

const getAllActivities = async (req, res) => 
	await getAllModels(req, res, ActivityModel);

const getActivityById = async (req, res) => 
	await getModelById(req, res, ActivityModel);

const createActivity = async (req, res) => 
	await createModel(res, ActivityModel, req.body);

const updateActivity = async (req, res) => 
	await updateModel(req, res, ActivityModel, req.body);

const deleteActivity = async (req, res) => 
	await deleteModel(req, res, ActivityModel);

module.exports = {
	getAllActivities,
	getActivityById,
	createActivity,
	updateActivity,
	deleteActivity,
};

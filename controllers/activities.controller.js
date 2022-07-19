const {
	getAllModels,
    getModelById,
	createModel,
    updateModel,
    deleteModel
} = require('../controllers/base.controller');

const ActivityModel = require("../models").Activity;

const createActivity = async (req, res) => { 
	const { name, content, image } = req.body;
	await createModel(res, ActivityModel, { name, content, image });
}

const getAllActivities = async (req, res) => 
	await getAllModels(req, res, ActivityModel);

const getActivityById = async (req, res) => 
	await getModelById(req, res, ActivityModel);

const updateActivity = async (req, res) => {
	const { name, content, image } = req.body;
	await updateModel(req, res, ActivityModel, { name, content, image });
}
	

const deleteActivity = async (req, res) => 
	await deleteModel(req, res, ActivityModel);

module.exports = {
	getAllActivities,
	getActivityById,
	createActivity,
	updateActivity,
	deleteActivity,
};

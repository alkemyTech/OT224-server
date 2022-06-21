const ActivityModel = require("../models").Activity;

const getAllActivities = async (req, res) => {
	try {
		const activities = await ActivityModel.findAll();
		return res.status(200).json(activities);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

const getActivityById = async (req, res) => {
	try {
		const a = await ActivityModel.findByPk(req.params.id);
		return res.status(200).json(a);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

const createActivity = async (req, res) => {
	try {
		let a = req.body;
		a = await ActivityModel.create(a);
		return res.status(201).json(a);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

const updateActivity = async (req, res) => {
	try {
		const id = req.params.id;
		await ActivityModel.update(req.body, { where: { id } })
		const activity = await ActivityModel.findByPk(id)
		res.status(200).json(activity)

	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

const deleteActivity = async (req, res) => {
	try {
		const id = req.params.id;
		await ActivityModel.destroy({ where: { id } })
		res.status(200).json(true)
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

module.exports = {
	getAllActivities,
	getActivityById,
	createActivity,
	updateActivity,
	deleteActivity,
};

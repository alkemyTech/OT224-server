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
		const id = req.params.id;
		const a = await ActivityModel.findByPk(id);
		if (!a) {
			return sendNotFound(res, id)
		}
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
		const activity = await ActivityModel.findByPk(id)
		if (!activity) {
			return sendNotFound(res, id)
		}
		ActivityModel.update(req.body, {
			where: { id }
		})
		return res.status(200).json(`The activity with id ${id} was updated`)
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};


const deleteActivity = async (req, res) => {
	try {
		const id = req.params.id;
		const activity = await ActivityModel.findByPk(id)
		if (!activity) {
			return sendNotFound(res, id)
		}
		await ActivityModel.destroy({ where: { id } })
		return res.status(204).json(true)
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

const sendNotFound = (res, id) => res.status(404).json(
	`The activity with id ${id} does not exist`
)

module.exports = {
	getAllActivities,
	getActivityById,
	createActivity,
	updateActivity,
	deleteActivity,
};

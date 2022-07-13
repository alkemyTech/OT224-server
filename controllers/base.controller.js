const ModelHelper = require('../helpers/modelHelper')
//Create a model
const createModel = async (res, model, inputVars) => {
    try {        
        const createdModel = await model.create(inputVars);
        return res.status(201).send(createdModel);
    } catch (error) {        
        res.status(500).send(error);
    }
}

//Get models
const getAllModels = async (req, res, model) => {    
    try {
        const modelHelper = new ModelHelper(model)
        const page = req.query.page || 1
        const models = await modelHelper.findAndPaginate(page)
        return res.status(200).send(models);
    } catch (error) {
        res.status(500).send(error);
    }
}

//Get model by id
const getModelById = async (req, res, model) => {
	try {
		const id = req.params.id;
		const retrievedModel = await model.findByPk(id);
		if (!retrievedModel) {			
           return sendNotFound(res, id);
		}
		return res.status(200).send(retrievedModel);
	} catch (error) {		
		res.status(500).send(error);
	}
};

//Update model
const updateModel = async (req, res, model, inputVars) => {
    try {
        const id = req.params.id
        const retrievedModel = await model.findByPk(id);
        
        if(!retrievedModel) {
            return sendNotFound(res, id);
        }

        const modelToUpdate = await model.update(inputVars, { where: { id } });

        if (modelToUpdate == 1){
            const updatedModel = await model.findByPk(id);
            return res.status(201).send(updatedModel);
        }

    } catch (error) {        
        res.status(500).send(error);
    }
}

//Delete model
const deleteModel = async (req, res, model) => {
    try {
        const id = req.params.id;
        const retrievedModel = await model.findByPk(id);
        
        if(!retrievedModel) {
            return sendNotFound(res, id);
        }else{
            await model.destroy({ where: { id } });
            return res.status(200).send({message: `id ${id} deleted!`});
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const sendNotFound = (res, id) => res.status(404).send({
	message : `id ${id} not found!`
})

module.exports = {
    createModel,
    getAllModels,
    updateModel,
    deleteModel,
    getModelById
}
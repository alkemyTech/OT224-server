const ModelHelper = require('../helpers/modelHelper')
//Create a model
const createModel = async (req, res, model) => {
    try {
        let variables = req.body;
        variables = await model.create(variables);
        return res.status(201).send(variables);
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
const getModelById = async (req, res, model, nameModel) => {
	try {
		const id = req.params.id;
		const variable = await model.findByPk(id);
		if (!variable) {			
            return res.status(404).send({message: nameModel + " with id:" + id + " not found!"});
		}
		return res.status(200).send(variable);
	} catch (error) {		
		res.status(500).send(error);
	}
};

//Update model
const updateModel = async (req, res, model, nameModel) => {
    try {
        const id = req.params.id
        const variables = await model.findByPk(id);
        console.log("Modelo: " + model);
        if(!variables) {
            return res.status(404).send({message: nameModel + " not found!"});
        }else{
            const modelToUpdate = await model.update(req.body, { where: { id } });

            if (modelToUpdate == 1){
                const updatedModel = await model.findByPk(id);
                return res.status(201).send(updatedModel);
            }
        }

    } catch (error) {        
        res.status(500).send(error);
    }
}

//Delete model
const deleteModel = async (req, res, model, nameModel) => {
    try {
        const id = req.params.id;
        const variables = await model.findByPk(id);
        
        if(!variables) {
            return res.status(404).send({message: nameModel + " not found!"});
        }else{
            await model.destroy({ where: { id } });
            return res.status(200).send({message: nameModel + " deleted!"});
        }
    } catch (error) {
        res.status(500).send(error);
    }
}


module.exports = {
    createModel,
    getAllModels,
    updateModel,
    deleteModel,
    getModelById
}
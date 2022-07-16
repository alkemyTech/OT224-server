const ModelCategories= require('../models').Categories;
const ModelNews=require('../models').News;
const ModelHelper=require('../helpers/modelHelper');
const baseController = require("./base.controller")

const getAllCategories= async (req, res) => {
  try{
     const paginated=new ModelHelper(ModelCategories)
     const {page}=req.query
     const pageLimit=10 
     const attributes=['name']

     const categoriesPaginated= await paginated.findAndPaginate(page,pageLimit,attributes)
     
     res.status(200).json({previousPage:categoriesPaginated.previousPage,
                           nextPage:categoriesPaginated.nextPage,
                           categories:categoriesPaginated.data})
   } catch(error) {
     res.status(500).json(error)
   }
};

const getOneCategory= async (req, res) => {                          
  return baseController.getModelById(req, res, ModelCategories)
};

const createCategory= async (req,res)=> { 
  const inputVars={name:req.body.name,
                   description:req.body.description,
                   image:req.body.image}
  return baseController.createModel(res, ModelCategories, inputVars) 
};

const updateCategory=async (req,res)=>{
  const inputVars={name:req.body.name,
                   description:req.body.description,
                   image:req.body.image} 
  return baseController.updateModel(req, res, ModelCategories, inputVars )
};

const deleteCategory=async (req,res)=>{
  try{
    const category= await ModelCategories.findByPk(req.params.id) 
    
    if(!category){
      return res.status(404).json('id not found')
    } else{
      const findNews=await ModelNews.findOne({where:{categoryId:category.id}})
      if(findNews!==null){
        return res.status(403).json({msg:"the category has news associated, can't delete it !"})
      } else {
        const delCategory=await ModelCategories.destroy({where: {id: req.params.id}})
        return res.status(200).json({msg:`category ${req.params.id} deleted`})
      }
    }  
  } catch(error) {
    res.status(500).json(error)
  }
};

module.exports = {getAllCategories,
                  getOneCategory,
                  createCategory,
                  updateCategory,
                  deleteCategory};
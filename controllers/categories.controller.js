const ModelCategories= require('../models').Categories;
const ModelNews=require('../models').News;
const ModelHelper=require('../helpers/modelHelper');

const getAllCategories= async (req, res) => {
  try{
     const paginated=new ModelHelper(ModelCategories)
     const {page}=req.query
     const pageLimit=10 
     const categoriesPaginated= await paginated.findAndPaginate(page,pageLimit,{attributes: ['name']})

     const showNames=categoriesPaginated.data.map((element=>{return element.name}))
     
     res.status(200).json({previousPage:categoriesPaginated.previousPage,
                           nextPage:categoriesPaginated.nextPage,
                           categories:showNames})
   } catch(error) {
     res.status(500).json(error)
   }
};

const getOneCategory= async (req, res) => {
  try{
    const category= await ModelCategories.findByPk(req.params.id) 
    
    if(!category){
      return res.status(404).json({msg:'the category does not exist'})
    };
    res.status(200).json(category)

  } catch(error) {
    res.status(500).json(error)
  }
};

const createCategory= async (req,res)=> {
  try {
    const category=await ModelCategories.create({name:req.body.name,
                                                description:req.body.description,
                                                image:req.body.image
                                              })         
    res.status(201).json(category)

  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
};

  const updateCategory=async (req,res)=>{
    res.json('update category')
  };

  const deleteCategory=async (req,res)=>{
    try{
      const category= await ModelCategories.findByPk(req.params.id) 
      
      if(!category){
        return res.status(404).json({msg:'the category does not exist'})
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
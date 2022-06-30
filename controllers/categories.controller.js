const ModelCategories= require('../models').Categories;
const ModelNews=require('../models').News;

const getAllCategories= async (req, res) => {
  try{
     const categories= await ModelCategories.findAll({attributes: ['name']})
     res.status(200).send(categories)    

   } catch(error) {
     res.status(500).send(error)
   }
};

const getOneCategory= async (req, res) => {
  try{
    const category= await ModelCategories.findByPk(req.params.id) 
    
    if(!category){
      return res.status(404).send({msg:'the category does not exist'})
    };
    res.status(200).send(category)

  } catch(error) {
    res.status(500).send(error)
  }
};

const createCategory= async (req,res)=> {
  try {
    const category=await ModelCategories.create({name:req.body.name,
                                                description:req.body.description,
                                                image:req.body.image
                                              })         
    res.status(201).send(category)

  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
};

  const updateCategory=async (req,res)=>{
    res.send('update category')
  };

  const deleteCategory=async (req,res)=>{
    try{
      const category= await ModelCategories.findByPk(req.params.id) 
      
      if(!category){
        return res.status(404).send({msg:'the category does not exist'})
      } else{
        const findNews=await ModelNews.findOne({where:{categoryId:category.id}})
        if(findNews!==null){
          return res.status(403).send({msg:"the category has news associated, can't delete it !"})
        } else {
          const delCategory=await ModelCategories.destroy({where: {id: req.params.id}})
          return res.status(200).send({msg:`category ${req.params.id} deleted`})
        }
      }  
    } catch(error) {
      res.status(500).send(error)
    }
  };



module.exports = {getAllCategories,
                  getOneCategory,
                  createCategory,
                  updateCategory,
                  deleteCategory};
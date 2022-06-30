const ModelCategories= require('../models').Categories;

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
    try{
      const categoryExists= await ModelCategories.findByPk(req.params.id) 
      
      if(!categoryExists){
        return res.status(404).send({msg:'the category does not exist'})
      } else {
        categoryExists.update({
            name:req.body.name,
            description:req.body.description,
            image:req.body.image
          })         
        res.status(200).send(categoryExists)
      }
    } catch(error) {
      res.status(500).send(error)
    }
  };

  const deleteCategory=async (req,res)=>{
    res.send('delete category')
  };



module.exports = {getAllCategories,
                  getOneCategory,
                  createCategory,
                  updateCategory,
                  deleteCategory};
const ModelCategories= require('../models').Categories;

const getAllCategories= async (req, res) => {
    const categories= await ModelCategories.findAll()
    try{
      if(categories){
        res.send("all categories")
      }

    } catch(error) {
      res.status(400).send(error)
    }
};


const createCategory= async (req,res)=> {
  try {
    const findName=await ModelCategories.findOne({where:{name:req.body.name}}) 
    if(findName) {
      res.status(403).json('category already exists')
    } else {
      const category=await ModelCategories.create({name:req.body.name,
                                                  description:req.body.description,
                                                  image:req.body.image
                                                })         
      res.status(201).json({msg:'category created successfully',category})
    }

  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
};

  const updateCategory=async (req,res)=>{
    res.send('update category')
  };

  const deleteCategory=async (req,res)=>{
    res.send('delete category')
  };



module.exports = {getAllCategories,
                  createCategory,
                  updateCategory,
                  deleteCategory};
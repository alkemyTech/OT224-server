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


const createCategorie= async (req,res)=> {
    res.send('create categorie')
  };

  const updateCategorie=async (req,res)=>{
    res.send('update categorie')
  };

  const deleteCategorie=async (req,res)=>{
    res.send('delete categorie')
  };



module.exports = {getAllCategories,
                  createCategorie,
                  updateCategorie,
                  deleteCategorie};
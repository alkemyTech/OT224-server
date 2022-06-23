const {uploadToBacket}= require ('../helpers/s3.js')

const upload= async (req, res)=>{
const file= req.files.file
const result= await uploadToBacket(file)
    res.status(201).send(result) 
}

module.exports= upload
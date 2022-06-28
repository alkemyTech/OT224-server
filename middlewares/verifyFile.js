const verifyFile= (req, res, next)=>{
if(!req.files || Object.keys(req.files).length === 0) return res.status(400).send({msg: 'no files were uploaded'})
    next()
}

module.exports= verifyFile
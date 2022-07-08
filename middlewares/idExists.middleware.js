const models= require('../models');

const idExists = (req, res, next) => {
  const { id } = req.params; 
  const [,,url] = req.originalUrl.split('/');
  return getModel(id, url).then(model => {
    if (!model) {
      return res.status(404).send('id not found');
    }
    next();
  });
}

const getModel = (id, url) => {
  let model;
  switch (url) {
    case 'categories': 
      model = models.Categories.findByPk(id);
      break;
  }
  return model;
}

module.exports = { idExists };
const models= require('../models');

const idExists = (req, res, next) => {
  const { id } = req.params; 
  const [,,url] = req.originalUrl.split('/');
  return getModel(id, url).then(model => {
    if (!model) {
      return res.status(404).json('id not found');
    }
    next();
  });
}

const getModel = (id, url) => {
  let model;
  switch (url) {
    case 'activities': 
      model = models.Activity.findByPk(id);
    break;
    case 'categories': 
      model = models.Categories.findByPk(id);
      break;
    case 'comments': 
      model = models.Comment.findByPk(id);
    break;
    case 'contacts': 
      model = models.Contacts.findByPk(id);
    break;
    case 'members': 
      model = models.Member.findByPk(id);
    break;
    case 'news': 
      model = models.News.findByPk(id);
    break;
    case 'organization': 
      model = models.Organization.findByPk(id);
    break;
    case 'roles': 
      model = models.Role.findByPk(id);
    break;
    case 'slides': 
      model = models.Slide.findByPk(id);
    break;
    case 'testimonials': 
      model = models.Testimonial.findByPk(id);
    break;
    case 'users': 
      model = models.User.findByPk(id);
    break;
    default: 
      model = null;
    break;
  }
  return model;
}

module.exports = { idExists };
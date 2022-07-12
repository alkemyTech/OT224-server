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
    case 'activity': 
      model = models.Activity.findByPk(id);
    break;
    case 'categories': 
      model = models.Categories.findByPk(id);
      break;
    case 'comment': 
      model = models.Comment.findByPk(id);
    break;
    case 'contacts': 
      model = models.Contacts.findByPk(id);
    break;
    case 'member': 
      model = models.Member.findByPk(id);
    break;
    case 'new': 
      model = models.News.findByPk(id);
    break;
    case 'organization': 
      model = models.Organization.findByPk(id);
    break;
    case 'role': 
      model = models.Role.findByPk(id);
    break;
    case 'slide': 
      model = models.Slide.findByPk(id);
    break;
    case 'testimonial': 
      model = models.Testimonial.findByPk(id);
    break;
    case 'user': 
      model = models.User.findByPk(id);
    break;
    default: 
      model = null;
    break;
  }
  return model;
}

module.exports = { idExists };
const { Router } = require('express');
const { getAllSlides, getSlideById, createSlide, deleteSlide } = require('../controllers/slide.controller');
const { verifyIsAdmin } = require('../middlewares/user.middelware');
const { validateSlide } = require('../validators/slideValidator');

const router = Router();

router.get('/', verifyIsAdmin, getAllSlides );

router.get('/:id', verifyIsAdmin ,getSlideById);

router.post('/', verifyIsAdmin ,validateSlide ,createSlide);

router.put('/update/:id' , /*controller*/);

router.delete('/:id', verifyIsAdmin ,deleteSlide);

module.exports = router;
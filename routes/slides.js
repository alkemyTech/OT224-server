const { Router } = require('express');
const { getAllSlides, getSlideById, createSlide, updateSlide, deleteSlide } = require('../controllers/slide.controller');
const { verifyIsAdmin } = require('../middlewares/user.middelware');
const { validateSlide, validateSlideToUpdate } = require('../validators/slideValidator');

const router = Router();



router.get('/', verifyIsAdmin, getAllSlides );

router.get('/:id', verifyIsAdmin ,getSlideById);

router.post('/', verifyIsAdmin ,validateSlide ,createSlide);

router.put('/:id' ,verifyIsAdmin, validateSlideToUpdate, updateSlide );

router.delete('/:id', verifyIsAdmin ,deleteSlide);

module.exports = router;
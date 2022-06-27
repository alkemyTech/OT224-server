const { Router } = require('express');
const { getAllSlides, getSlideById, createSlide } = require('../controllers/slide.controller');
const { verifyIsAdmin } = require('../middlewares/user.middelware');
const { validateSlide } = require('../validators/slideValidator');

const router = Router();

router.get('/', getAllSlides );

router.get('/:id', verifyIsAdmin ,getSlideById);

router.post('/', verifyIsAdmin ,validateSlide ,createSlide);

router.put('/update/:id' , /*controller*/);

router.delete('/delete/:id', /*controller*/);

module.exports = router;
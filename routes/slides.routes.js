const { Router } = require('express');
const { getAllSlides,
        getSlideById, 
        createSlide, 
        updateSlide, 
        deleteSlide } = require('../controllers/slide.controller');

const { verifyIsAdmin, idExists, optionsFileUpload } = require('../middlewares');
const { validateSlide, validateSlideToUpdate } = require('../validators');

const router = Router();


router.use( verifyIsAdmin )

router.get('/', getAllSlides );
router.post('/', optionsFileUpload, validateSlide, createSlide);



router.get('/:id', idExists, getSlideById);
router.put('/:id' , idExists, optionsFileUpload, validateSlideToUpdate, updateSlide );
router.delete('/:id' , idExists ,deleteSlide);

module.exports = router;
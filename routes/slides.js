const { Router } = require('express');
const { getAllSlides, getSlideById } = require('../controllers/slide.controller');
const { verifyIsAdmin } = require('../middlewares/user.middelware');

const router = Router();

router.get('/', getAllSlides );

router.get('/:id', verifyIsAdmin ,getSlideById);

router.post('/create', /* controller*/);

router.put('/update/:id' , /*controller*/);

router.delete('/delete/:id', /*controller*/);

module.exports = router;
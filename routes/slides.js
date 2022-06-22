const { Router } = require('express');
const { getAllSlides } = require('../controllers/slide.controller');

const router = Router();

router.get('/', getAllSlides );

router.get('/:id', /*controller*/);

router.post('/create', /* controller*/);

router.put('/update/:id' , /*controller*/);

router.delete('/delete/:id', /*controller*/);

module.exports = router;
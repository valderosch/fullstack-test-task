const express = require('express')
const multer = require('multer');
const HeroController = require('../controllers/heroController');

const router = express.Router();
const dataStorageSave = multer({ dest: 'storage/' });
const heroController = new HeroController();

router.get('/', heroController.getHeroes);
router.get('/:id', heroController.getHero);
router.post('/', dataStorageSave.array('images_links'), heroController.createHero);
router.put('/:id', dataStorageSave.array('images_links'), heroController.updateHero);
router.delete('/:id', heroController.deleteHero);

module.exports = router;

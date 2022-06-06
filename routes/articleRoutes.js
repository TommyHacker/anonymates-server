const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleControllers');

router.get('/', articleController.all);
router.get('/:id', articleController.one);
router.post('/', articleController.create);
router.put('/', articleController.update);

module.exports = router;

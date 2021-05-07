const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require("../controllers/user");

router.get('/', auth, userController.index);
router.post('/', userController.create);
router.get('/:userId', auth, userController.show);
router.put('/:userId', auth, userController.update);
router.delete('/:userId', auth, userController.delete);

module.exports = router;

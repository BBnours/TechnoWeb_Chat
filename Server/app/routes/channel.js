const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const channelController = require("../controllers/channel");

router.get('/', auth,  channelController.index);
router.post('/', channelController.create);
router.put('/:channelId', auth, channelController.update);
router.delete('/:channelId', auth, channelController.delete);

module.exports = router;

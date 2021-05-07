const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const messageController = require("../controllers/message");

router.get('/channels/:channelId/messages', auth, messageController.index);
router.post("/channels/:channelId/messages", auth, messageController.create);
router.get("/messages/:messageId", messageController.show);
router.put('/messages/:messageId', auth, messageController.update);
router.delete('/messages/:messageId', auth, messageController.delete);

module.exports = router;
